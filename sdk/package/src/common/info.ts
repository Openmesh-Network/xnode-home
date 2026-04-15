import type { rust_types } from "./utils/index.js";

export type User = {
  name: rust_types.String;
  id: rust_types.u32;
  group: rust_types.u32;
  description: rust_types.String;
  home: rust_types.String;
  login: rust_types.String;
};

export type Group = {
  name: rust_types.String;
  id: rust_types.u32;
  members: rust_types.Vec<rust_types.String>;
};
