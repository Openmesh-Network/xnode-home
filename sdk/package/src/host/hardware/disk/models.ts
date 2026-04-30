import type { rust_types } from "../../../common/utils/index.js";

export type DiskOptions = {
  usage: rust_types.Option<rust_types.bool>;
};

export type Disk = {
  id: rust_types.String;
  usage: rust_types.Option<Usage>;
};

export type Usage = {
  total: rust_types.u64;
  used: rust_types.u64;
  read: rust_types.u64;
  written: rust_types.u64;
};
