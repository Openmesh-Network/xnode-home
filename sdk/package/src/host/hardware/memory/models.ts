import type { rust_types } from "../../../common/utils/index.js";

export type Usage = {
  total: rust_types.u64;
  available: rust_types.u64;
};
