import type { ResponseResult } from "../../../common/response.js";
import type { Bytes } from "../../../common/utils/bytes.js";
import {
  JsonGet,
  JsonPost,
  type WithClient,
} from "../../../common/utils/client.js";
import type { Permission, SetQuery } from "../models.js";
import { scope, type Path } from "./scope.js";

export type get_input = WithClient<{ path: Path }>;
export type get_output = ResponseResult<Permission>;
export async function get(input: get_input): Promise<get_output> {
  return JsonGet(input, (path) => `${scope(path)}/get`);
}

export type set_input = WithClient<{
  path: Path;
  query: SetQuery;
  data: Permission;
}>;
export type set_output = ResponseResult<Bytes>;
export async function set(input: set_input): Promise<set_output> {
  return JsonPost(input, (path) => `${scope(path)}/set`);
}
