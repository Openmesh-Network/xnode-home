import type { ResponseResult } from "../common/response.js";
import type { Bytes } from "../common/utils/bytes.js";
import { RawPost, type WithClient } from "../common/utils/client.js";
import { scope, type ContainerPath } from "./scope.js";

export type remove_input = WithClient<{
  path: ContainerPath;
}>;
export type remove_output = ResponseResult<Bytes>;
export async function remove(input: remove_input): Promise<remove_output> {
  return RawPost(input, (path) => `${scope(path)}/remove`);
}
