import type { CommandOptions, ResponseCommand } from "../../common/command.js";
import type { ApplyQuery, UpdateData } from "../../common/nix.js";
import type { ResponseResult } from "../../common/response.js";
import type { Bytes } from "../../common/utils/bytes.js";
import {
  JsonPost,
  RawGet,
  RawPost,
  type WithClient,
} from "../../common/utils/client.js";
import { scope as parentScope } from "../scope.js";

export function scope() {
  return parentScope() + "/config";
}

export type get_input = WithClient<{}>;
export type get_output = ResponseResult<Bytes>;
export async function get(input: get_input): Promise<get_output> {
  return RawGet(input, `${scope()}/get`);
}

export type set_input = WithClient<{ data: Bytes }>;
export type set_output = ResponseResult<Bytes>;
export async function set(input: set_input): Promise<set_output> {
  return RawPost(input, `${scope()}/set`);
}

export type version_input = WithClient<{}>;
export type version_output = ResponseResult<Bytes>;
export async function version(input: version_input): Promise<version_output> {
  return RawGet(input, `${scope()}/version`);
}

export type update_input = WithClient<{
  data: UpdateData & CommandOptions;
}>;
export type update_output = ResponseCommand;
export async function update(input: update_input): Promise<update_output> {
  return JsonPost(input, `${scope()}/update`);
}

export type build_input = WithClient<{
  data: CommandOptions;
}>;
export type build_output = ResponseCommand;
export async function build(input: build_input): Promise<build_output> {
  return JsonPost(input, `${scope()}/build`);
}

export type apply_input = WithClient<{
  query: ApplyQuery;
  data: CommandOptions;
}>;
export type apply_output = ResponseResult<ResponseCommand>;
export async function apply(input: apply_input): Promise<apply_output> {
  return JsonPost(input, `${scope()}/apply`);
}
