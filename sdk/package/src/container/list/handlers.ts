import type { Process } from "../../common/process.js";
import type { ResponseResult } from "../../common/response.js";
import { JsonGet, type WithClient } from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope, type ContainerPath } from "../scope.js";

export function scope<Path extends ContainerPath>(path: Path) {
  return parentScope(path) + "/list";
}

export type process_input = WithClient<{ path: ContainerPath }>;
export type process_output = ResponseResult<rust_types.Vec<Process>>;
export async function process(input: process_input): Promise<process_output> {
  return JsonGet(input, (path) => `${scope(path)}/process`);
}
