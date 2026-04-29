import type { ResponseResult } from "../../../common/response.js";
import { JsonGet, type WithClient } from "../../../common/utils/client.js";
import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import type { Disk, DiskOptions, Usage } from "./models.js";
import { scope, type Path } from "./scope.js";

export type disk_input = WithClient<{ query: DiskOptions }>;
export type disk_output = ResponseResult<rust_types.Vec<Disk>>;
export async function disk(input: disk_input): Promise<disk_output> {
  return JsonGet(input, `${parentScope()}/disk`);
}

export type usage_input = WithClient<{ path: Path }>;
export type usage_output = ResponseResult<Usage>;
export async function usage(input: usage_input): Promise<usage_output> {
  return JsonGet(input, (path) => `${scope(path)}/usage`);
}
