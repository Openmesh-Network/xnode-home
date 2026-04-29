import type { rust_types } from "../../../common/utils/index.js";

export type NetworkOptions = {
  usage: rust_types.Option<rust_types.bool>;
};

export type Network = {
  id: rust_types.String;
  usage: rust_types.Option<Usage>;
};

export type Address =
  | {
      IPv4: rust_types.String;
    }
  | {
      IPv6: rust_types.String;
    };

export type Info = {
  mac: rust_types.String;
  addresses: rust_types.Vec<Address>;
};

export type Usage = {
  received: rust_types.u64;
  transmitted: rust_types.u64;
};
