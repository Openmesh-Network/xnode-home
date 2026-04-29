import type { ResponseResult } from "../common/response.js";
import type { Bytes } from "../common/utils/bytes.js";
import { JsonGet, RawPost, type WithClient } from "../common/utils/client.js";
import type { rust_types } from "../common/utils/index.js";
import type { Container } from "./models.js";
import { scope, type Path } from "./scope.js";

export type container_input = WithClient<{}>;
export type container_output = ResponseResult<rust_types.Vec<Container>>;
export async function container(
  input: container_input
): Promise<container_output> {
  return JsonGet(input, "/container");
}

export type create_input = WithClient<{
  path: Path;
}>;
export type create_output = ResponseResult<Bytes>;
export async function create(input: create_input): Promise<create_output> {
  return RawPost(input, (path) => `${scope(path)}/create`);
}

export type remove_input = WithClient<{
  path: Path;
}>;
export type remove_output = ResponseResult<Bytes>;
export async function remove(input: remove_input): Promise<remove_output> {
  return RawPost(input, (path) => `${scope(path)}/remove`);
}
