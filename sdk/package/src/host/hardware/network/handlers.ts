import type { ResponseResult } from "../../../common/response.js";
import { JsonGet, type WithClient } from "../../../common/utils/client.js";
import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import type { Network, NetworkOptions, Info, Usage } from "./models.js";
import { scope, type Path } from "./scope.js";

export type network_input = WithClient<{ query: NetworkOptions }>;
export type network_output = ResponseResult<rust_types.Vec<Network>>;
export async function network(input: network_input): Promise<network_output> {
  return JsonGet(input, `${parentScope()}/network`);
}

export type info_input = WithClient<{ path: Path }>;
export type info_output = ResponseResult<Info>;
export async function info(input: info_input): Promise<info_output> {
  return JsonGet(input, (path) => `${scope(path)}/info`);
}

export type usage_input = WithClient<{ path: Path }>;
export type usage_output = ResponseResult<Usage>;
export async function usage(input: usage_input): Promise<usage_output> {
  return JsonGet(input, (path) => `${scope(path)}/usage`);
}
