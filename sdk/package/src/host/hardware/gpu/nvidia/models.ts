import type { rust_types } from "../../../../common/utils/index.js";

export type GpuOptions = {
  usage: rust_types.Option<rust_types.bool>;
};

export type Gpu = {
  id: rust_types.String;
  usage: rust_types.Option<Usage>;
};

export type Info = {
  name: rust_types.String;
};

export type MemoryUsage = {
  total: rust_types.u64;
  available: rust_types.u64;
};

export type Usage = {
  compute: rust_types.u32;
  memory: MemoryUsage;
  power: rust_types.Option<rust_types.u32>;
};
