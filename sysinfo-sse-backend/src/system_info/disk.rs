use sysinfo::DiskExt;

#[derive(serde::Serialize)]
pub struct Disk {
    pub name: String,
    pub total_space: u64,
    pub available_space: u64,
}

impl Disk {
    pub fn new(disk: &sysinfo::Disk) -> Self {
        Self {
            name: disk.name().to_string_lossy().to_string(),
            total_space: disk.total_space(),
            available_space: disk.available_space(),
        }
    }
}
