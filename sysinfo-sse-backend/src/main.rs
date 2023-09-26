use std::{
    net::{IpAddr, Ipv4Addr, SocketAddr},
    time::Duration,
};

use axum::{
    http::StatusCode,
    response::{sse::Event, IntoResponse, Sse},
    routing::get,
    Json, Router, Server,
};
use futures::stream;
use sysinfo::SystemExt;
use tokio_stream::StreamExt as _;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::permissive();

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/realtime", get(get_sysinfo_realtime))
        .route("/", get(get_sysinfo))
        .layer(cors);

    let addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)), 8080);
    println!("Server running on http://{addr}");
    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn health_check() -> impl IntoResponse {
    (StatusCode::OK, "OK")
}

#[derive(serde::Serialize)]
pub struct SysInfo {
    pub hostname: String,
    pub uptime: u64,
    pub os: String,
    pub load_one: f64,
    pub load_five: f64,
    pub load_fifteen: f64,
}

impl Default for SysInfo {
    fn default() -> Self {
        let info = sysinfo::System::new_all();
        Self {
            hostname: info.host_name().unwrap_or_default(),
            uptime: info.uptime(),
            os: info.long_os_version().unwrap_or_default(),
            load_one: info.load_average().one,
            load_five: info.load_average().five,
            load_fifteen: info.load_average().fifteen,
        }
    }
}

async fn get_sysinfo() -> impl IntoResponse {
    let info = SysInfo::default();

    (StatusCode::OK, Json(info))
}

async fn get_sysinfo_realtime() -> impl IntoResponse {
    let stream = stream::repeat_with(|| Event::default().json_data(SysInfo::default()))
        .throttle(Duration::from_secs(1));
    Sse::new(stream).keep_alive(
        axum::response::sse::KeepAlive::new()
            .interval(Duration::from_secs(1))
            .text("keep-alive-text"),
    )
}
