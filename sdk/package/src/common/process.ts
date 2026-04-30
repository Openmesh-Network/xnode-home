import type { rust_types } from "./utils/index.js";

export type ProcessOptions = {
  status: rust_types.Option<rust_types.bool>;
  usage: rust_types.Option<rust_types.bool>;
};

export type Process = {
  id: rust_types.String;
  status: rust_types.Option<Status>;
  usage: rust_types.Option<Usage>;
};

export type Info = {
  description: rust_types.Option<rust_types.String>;
};

export type Status = {
  running: rust_types.bool;
  exit_code: rust_types.u8;
};

export type LogQuery = {
  level: rust_types.Option<LogLevel>;
  /// Epoch time in microseconds
  after: rust_types.Option<rust_types.u64>;
  max: rust_types.Option<rust_types.u32>;
};

export type Log = {
  /// Epoch time in microseconds
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
