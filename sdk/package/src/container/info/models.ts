import type { rust_types } from "../../common/utils/index.js";

export type FlakeQuery = {
  flake: rust_types.String;
};

export type EvalQuery = {
  statement: rust_types.String;
};
