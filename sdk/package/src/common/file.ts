import type { rust_types } from "./utils/index.js";

export type Metadata =
  | { File: {} }
  | { Folder: {} }
  | { Link: {} }
  | { Unknown: {} };

export type Size = {
  exclusive: rust_types.u64;
  shared: rust_types.u64;
};

export type ReadFolderOptions = {
  metadata: rust_types.Option<rust_types.bool>;
};

export type FolderItem = {
  name: rust_types.String;
  metadata: rust_types.Option<Metadata>;
};

export type Entity =
  | { User: rust_types.u32 }
  | { Group: rust_types.u32 }
  | "Any"
  | "Unknown";

export type Permission = {
  granted_to: Entity;
  read: rust_types.bool;
  write: rust_types.bool;
  execute: rust_types.bool;
};

export type PathQuery = {
  path: rust_types.String;
};

export type SourceDestinationData = {
  source: rust_types.String;
  destination: rust_types.String;
};
