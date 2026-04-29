import type { ResponseResult } from "../../../common/response.js";
import { JsonGet, type WithClient } from "../../../common/utils/client.js";
import type { Usage } from "./models.js";
import { scope } from "./scope.js";

export type usage_input = WithClient<{}>;
export type usage_output = ResponseResult<Usage>;
export async function usage(input: usage_input): Promise<usage_output> {
  return JsonGet(input, `${scope()}/usage`);
}
