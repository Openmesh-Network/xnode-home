import type { Process } from "../../common/process.js";
import type { ResponseResult } from "../../common/response.js";
import { JsonGet, type WithClient } from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

export function scope() {
  return parentScope() + "/list";
}

export type process_input = WithClient<{}>;
export type process_output = ResponseResult<rust_types.Vec<Process>>;
export async function process(input: process_input): Promise<process_output> {
  return JsonGet(input, `${scope()}/process`);
}

export type container_input = WithClient<{}>;
export type container_output = ResponseResult<
  rust_types.Vec<rust_types.String>
>;
export async function container(
  input: container_input
): Promise<container_output> {
  return JsonGet(input, `${scope()}/container`);
}
