use sysinfo::{NetworkData, NetworkExt};

#[derive(serde::Serialize)]
pub struct Network {
    pub interface_name: String,
    pub data_transmitted: u64,
    pub data_received: u64,
}

impl Network {
    pub fn new(interface_name: &String, data: &NetworkData) -> Self {
        Self {
            interface_name: interface_name.to_string(),
            data_transmitted: data.transmitted(),
            data_received: data.received(),
        }
    }
}
