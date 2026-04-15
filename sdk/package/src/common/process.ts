import type { rust_types } from "./utils/index.js";

export type Process = {
  name: rust_types.String;
  description: rust_types.Option<rust_types.String>;
  running: rust_types.bool;
};

export type Status = {
  running: rust_types.bool;
};

export type LogQuery = {
  level: rust_types.Option<LogLevel>;
  after: rust_types.Option<rust_types.u64>;
  max: rust_types.Option<rust_types.u32>;
};

export type Log = {
  /// Epoch time in seconds
  timestamp: rust_types.u64;
  message: rust_types.String;
  level: LogLevel;
};

export type LogLevel = "Error" | "Warn" | "Info" | "Unknown";

export type Usage = {
  cpu: rust_types.Option<rust_types.u64>;
  memory: rust_types.Option<rust_types.u64>;
  network_ingress: rust_types.Option<rust_types.u64>;
  network_egress: rust_types.Option<rust_types.u64>;
  disk_read: rust_types.Option<rust_types.u64>;
  disk_write: rust_types.Option<rust_types.u64>;
};
