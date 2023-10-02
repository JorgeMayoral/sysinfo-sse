export interface SysInfo {
  // System info
  system_name: string;
  hostname: string;
  uptime: number;
  os: string;
  kernel_version: string;
  // System load
  load_one: number;
  load_five: number;
  load_fifteen: number;
  // Memory
  total_memory: number;
  used_memory: number;
  total_swap: number;
  used_swap: number;
  // CPUs
  cpu_usage: number[];
  // Components
  components_info: ComponentInfo[];
  // Disks
  disks_info: DiskInfo[];
  // Network
  network_info: NetworkInfo[];
}

export interface ComponentInfo { label: string; temperature: number }

export interface DiskInfo { name: string; total_space: number; available_space: number }

export interface NetworkInfo {
  interface_name: string;
  data_transmitted: number;
  data_received: number;
}
