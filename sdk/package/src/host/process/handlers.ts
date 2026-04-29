import type {
  Info,
  Log,
  LogQuery,
  Process,
  ProcessOptions,
  Status,
  Usage,
} from "../../common/process.js";
import type { ResponseResult } from "../../common/response.js";
import type { Bytes } from "../../common/utils/bytes.js";
import {
  JsonGet,
  RawPost,
  type WithClient,
} from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import { scope, type Path } from "./scope.js";

export type process_input = WithClient<{
  query: ProcessOptions;
}>;
export type process_output = ResponseResult<rust_types.Vec<Process>>;
export async function process(input: process_input): Promise<process_output> {
  return JsonGet(input, `${parentScope()}/process`);
}

export type info_input = WithClient<{ path: Path }>;
export type info_output = ResponseResult<Info>;
export async function info(input: info_input): Promise<info_output> {
  return JsonGet(input, (path) => `${scope(path)}/info`);
}

export type status_input = WithClient<{ path: Path }>;
export type status_output = ResponseResult<Status>;
export async function status(input: status_input): Promise<status_output> {
  return JsonGet(input, (path) => `${scope(path)}/status`);
}

export type logs_input = WithClient<{ path: Path; query: LogQuery }>;
export type logs_output = ResponseResult<rust_types.Vec<Log>>;
export async function logs(input: logs_input): Promise<logs_output> {
  return JsonGet(input, (path) => `${scope(path)}/logs`);
}

export type usage_input = WithClient<{ path: Path }>;
export type usage_output = ResponseResult<Usage>;
export async function usage(input: usage_input): Promise<usage_output> {
  return JsonGet(input, (path) => `${scope(path)}/usage`);
}

export type start_input = WithClient<{ path: Path }>;
export type start_output = ResponseResult<Bytes>;
export async function start(input: start_input): Promise<start_output> {
  return RawPost(input, (path) => `${scope(path)}/start`);
}

export type stop_input = WithClient<{ path: Path }>;
export type stop_output = ResponseResult<Bytes>;
export async function stop(input: stop_input): Promise<stop_output> {
  return RawPost(input, (path) => `${scope(path)}/stop`);
}

export type restart_input = WithClient<{ path: Path }>;
export type restart_output = ResponseResult<Bytes>;
export async function restart(input: restart_input): Promise<restart_output> {
  return RawPost(input, (path) => `${scope(path)}/restart`);
}

export type reload_input = WithClient<{ path: Path }>;
export type reload_output = ResponseResult<Bytes>;
export async function reload(input: reload_input): Promise<reload_output> {
  return RawPost(input, (path) => `${scope(path)}/reload`);
}
