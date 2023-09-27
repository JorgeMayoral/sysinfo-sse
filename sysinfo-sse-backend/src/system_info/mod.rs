use sysinfo::{CpuExt, SystemExt};

use self::{component::Component, disk::Disk, network::Network};

mod component;
mod disk;
mod network;

#[derive(serde::Serialize)]
pub struct SysInfo {
    // System information
    pub system_name: String,
    pub hostname: String,
    pub uptime: u64,
    pub os: String,
    pub kernel_version: String,
    // System load
    pub load_one: f64,
    pub load_five: f64,
    pub load_fifteen: f64,
    // Memory
    pub total_memory: u64,
    pub used_memory: u64,
    pub total_swap: u64,
    pub used_swap: u64,
    // CPUs
    pub cpu_usage: Vec<f32>,
    // Disks
    pub disks_info: Vec<Disk>,
    // Network
    pub network_info: Vec<Network>,
    // Components
    pub components_info: Vec<Component>,
}

impl Default for SysInfo {
    fn default() -> Self {
        let mut info = sysinfo::System::new_all();
        info.refresh_all();
        info.refresh_cpu();
        Self {
            system_name: info.name().unwrap_or_default(),
            hostname: info.host_name().unwrap_or_default(),
            uptime: info.uptime(),
            os: info.long_os_version().unwrap_or_default(),
            kernel_version: info.kernel_version().unwrap_or_default(),
            load_one: info.load_average().one,
            load_five: info.load_average().five,
            load_fifteen: info.load_average().fifteen,
            total_memory: info.total_memory(),
            used_memory: info.used_memory(),
            total_swap: info.total_swap(),
            used_swap: info.used_swap(),
            cpu_usage: info.cpus().iter().map(|cpu| cpu.cpu_usage()).collect(),
            disks_info: info.disks().iter().map(Disk::new).collect(),
            network_info: info
                .networks()
                .into_iter()
                .map(|(interface_name, data)| Network::new(interface_name, data))
                .collect(),
            components_info: info.components().iter().map(Component::new).collect(),
        }
    }
}
