import type { ResponseResult } from "../../../common/response.js";
import { JsonGet, type WithClient } from "../../../common/utils/client.js";
import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import type { Cpu, CpuOptions, Info, Usage } from "./models.js";
import { scope, type Path } from "./scope.js";

export type cpu_input = WithClient<{ query: CpuOptions }>;
export type cpu_output = ResponseResult<rust_types.Vec<Cpu>>;
export async function cpu(input: cpu_input): Promise<cpu_output> {
  return JsonGet(input, `${parentScope()}/cpu`);
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
