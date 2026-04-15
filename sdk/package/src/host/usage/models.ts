import type { rust_types } from "../../common/utils/index.js";

export type CpuUsage = {
  name: rust_types.String;
  used: rust_types.f32;
  frequency: rust_types.u64;
};

export type MemoryUsage = {
  used: rust_types.u64;
  total: rust_types.u64;
};

export type DiskUsage = {
  mount_point: rust_types.String;
  used: rust_types.u64;
  total: rust_types.u64;
  read: rust_types.u64;
  written: rust_types.u64;
};

export type NetworkUsage = {
  name: rust_types.String;
  mac: rust_types.String;
  addresses: rust_types.Vec<rust_types.String>;
  received: rust_types.u64;
  transmitted: rust_types.u64;
};

export type GpuUsage = {
  Nvidia: {
    id: rust_types.String;
    name: rust_types.String;
    compute: rust_types.f32;
    memory: MemoryUsage;
    power: rust_types.Option<rust_types.u32>;
  };
};
