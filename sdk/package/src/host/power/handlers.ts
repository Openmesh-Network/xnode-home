import type { ResponseResult } from "../../common/response.js";
import type { Bytes } from "../../common/utils/bytes.js";
import { RawPost, type WithClient } from "../../common/utils/client.js";
import { scope } from "./scope.js";

export type off_input = WithClient<{}>;
export type off_output = ResponseResult<Bytes>;
export async function off(input: off_input): Promise<off_output> {
  return RawPost(input, `${scope()}/off`);
}

export type reboot_input = WithClient<{}>;
export type reboot_output = ResponseResult<Bytes>;
export async function reboot(input: reboot_input): Promise<reboot_output> {
  return RawPost(input, `${scope()}/reboot`);
}
