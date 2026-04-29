import type { rust_types } from "../../common/utils/index.js";

export type Weight =
  | "Idle"
  | {
      Value: rust_types.u64;
    };

export type CPUPermission = {
  /// In case there is more work than compute power, in what relative priority to allocate compute to this process. (default 100)
  weight: rust_types.Option<Weight>;
  /// Maximum compute power this process is allowed to use. (e.g. 100 is one core, 250 is two and a half cores)
  max: rust_types.Option<rust_types.u64>;
  /// Specific core indexes, the process will only run on these cores.
  allowed_cores: rust_types.Option<rust_types.Vec<rust_types.u64>>;
};

export type MemoryPermission = {
  /// Hard limit on memory this process is allowed to use in bytes.
  max: rust_types.Option<rust_types.u64>;
  /// Memory usage may go above the limit if unavoidable, but the processes are heavily slowed down and memory is taken away aggressively in such cases.
  soft_max: rust_types.Option<rust_types.u64>;
};

export type SubprocessPermission = {
  /// Maximum number of subprocesses this process is allowed to spawn.
  max: rust_types.Option<rust_types.u64>;
};

export type BandwidthPermission = {
  read: rust_types.Option<rust_types.u64>;
  write: rust_types.Option<rust_types.u64>;
};

export type IopsPermission = {
  read: rust_types.Option<rust_types.u64>;
  write: rust_types.Option<rust_types.u64>;
};

export type InputOutputPermission = {
  /// In case there is more work than IO, in what relative priority to allocate IO to this process. (default 100)
  weight: rust_types.Option<Weight>;
  /// Maximum block IO bandwidth this process is allowed to use in bytes.
  max_bandwidth: rust_types.Option<BandwidthPermission>;
  /// Maximum block IO IOs-per-Second this process is allowed to use.
  max_iops: rust_types.Option<IopsPermission>;
};

export type ProcessPermission = {
  cpu: rust_types.Option<CPUPermission>;
  memory: rust_types.Option<MemoryPermission>;
  subprocess: rust_types.Option<SubprocessPermission>;
  io: rust_types.Option<
    rust_types.HashMap<rust_types.String, InputOutputPermission>
  >;
};

export type DiskPermission = {
  total: rust_types.Option<rust_types.u64>;
};

export type BindPermission = {
  path: rust_types.Option<rust_types.String>;
  readonly: rust_types.Option<rust_types.bool>;
};

export type DevicePolicyPermission = "Strict" | "Closed" | "Auto";

export type DeviceAllowPermission = {
  read: rust_types.Option<rust_types.bool>;
  write: rust_types.Option<rust_types.bool>;
  mknod: rust_types.Option<rust_types.bool>;
};

export type DevicePermission = {
  policy: rust_types.Option<DevicePolicyPermission>;
  allow: rust_types.Option<
    rust_types.HashMap<rust_types.String, DeviceAllowPermission>
  >;
};

export type Permission = {
  process: rust_types.Option<ProcessPermission>;
  disk: rust_types.Option<DiskPermission>;
  bind: rust_types.Option<
    rust_types.HashMap<rust_types.String, BindPermission>
  >;
  device: rust_types.Option<DevicePermission>;
  extra_args: rust_types.Option<rust_types.Vec<rust_types.String>>;
};

export type SetQuery = {
  detect_changes: rust_types.Option<rust_types.bool>;
  allow_restart: rust_types.Option<rust_types.bool>;
};
