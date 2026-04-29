import type { rust_types } from "./utils/index.js";

export type UpdateData = {
  inputs: rust_types.Vec<rust_types.String>;
};

export type ApplyWhen = "Now" | "NextBoot";

export type ApplyQuery = {
  when: rust_types.Option<ApplyWhen>;
};

export type FlakeQuery = {
  flake: rust_types.String;
};

export type FlakeMetadata = {
  last_modified: rust_types.u64;
  revision: rust_types.String;
};

export type EvalQuery = {
  statement: rust_types.String;
  /// statement is a suffix for /flake#nixosConfiguration.xnode.
  config: rust_types.Option<rust_types.bool>;
};
