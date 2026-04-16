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
import { scope as parentScope, type ContainerPath } from "../scope.js";

export function scope<Path extends ContainerPath>(path: Path) {
  return parentScope(path) + "/config";
}

export type get_input = WithClient<{ path: ContainerPath }>;
export type get_output = ResponseResult<Bytes>;
export async function get(input: get_input): Promise<get_output> {
  return RawGet(input, (path) => `${scope(path)}/get`);
}

export type set_input = WithClient<{ path: ContainerPath; data: Bytes }>;
export type set_output = ResponseResult<Bytes>;
export async function set(input: set_input): Promise<set_output> {
  return RawPost(input, (path) => `${scope(path)}/set`);
}

export type version_input = WithClient<{ path: ContainerPath }>;
export type version_output = ResponseResult<Bytes>;
export async function version(input: version_input): Promise<version_output> {
  return RawGet(input, (path) => `${scope(path)}/version`);
}

export type update_input = WithClient<{
  path: ContainerPath;
  data: UpdateData & CommandOptions;
}>;
export type update_output = ResponseCommand;
export async function update(input: update_input): Promise<update_output> {
  return JsonPost(input, (path) => `${scope(path)}/update`);
}

export type build_input = WithClient<{
  path: ContainerPath;
  data: CommandOptions;
}>;
export type build_output = ResponseCommand;
export async function build(input: build_input): Promise<build_output> {
  return JsonPost(input, (path) => `${scope(path)}/build`);
}

export type apply_input = WithClient<{
  path: ContainerPath;
  query: ApplyQuery;
  data: CommandOptions;
}>;
export type apply_output = ResponseResult<ResponseCommand>;
export async function apply(input: apply_input): Promise<apply_output> {
  return JsonPost(input, (path) => `${scope(path)}/apply`);
}
