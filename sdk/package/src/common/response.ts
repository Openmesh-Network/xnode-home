import type { rust_types } from "./utils/index.js";

export type ResponseError = {
  error: rust_types.String;
  typed_error: rust_types.Option<TypedResponseError>;
};

export type TypedResponseError = {
  PathNotFound: {
    path: rust_types.String;
  };
};

/// Indicates that this endpoint can fail
export type ResponseResult<T> = T;
