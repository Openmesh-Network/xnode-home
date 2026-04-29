import type { rust_types } from "../../../common/utils/index.js";

export type CpuOptions = {
  usage: rust_types.Option<rust_types.bool>;
};

export type Cpu = {
  id: rust_types.String;
  usage: rust_types.Option<Usage>;
};

export type Info = {
  name: rust_types.String;
  flags: rust_types.Vec<rust_types.String>;
};

export type Usage = {
  user: rust_types.u64;
  nice: rust_types.u64;
  system: rust_types.u64;
  idle: rust_types.u64;
  iowait: rust_types.u64;
  irq: rust_types.u64;
  softirq: rust_types.u64;
  steal: rust_types.u64;
  guest: rust_types.u64;
  guest_nice: rust_types.u64;
};
