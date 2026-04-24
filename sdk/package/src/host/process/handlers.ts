import type { Log, LogQuery, Status, Usage } from "../../common/process.js";
import type { ResponseResult } from "../../common/response.js";
import type { Bytes } from "../../common/utils/bytes.js";
import {
  JsonGet,
  RawPost,
  type WithClient,
} from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import type { ProcessPath } from "./models.js";

export function scope() {
  return parentScope() + "/process";
}

export type logs_input = WithClient<{ path: ProcessPath; query: LogQuery }>;
export type logs_output = ResponseResult<rust_types.Vec<Log>>;
export async function logs(input: logs_input): Promise<logs_output> {
  return JsonGet(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/logs`
  );
}

export type status_input = WithClient<{ path: ProcessPath }>;
export type status_output = ResponseResult<Status>;
export async function status(input: status_input): Promise<status_output> {
  return JsonGet(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/status`
  );
}

export type usage_input = WithClient<{ path: ProcessPath }>;
export type usage_output = ResponseResult<Usage>;
export async function usage(input: usage_input): Promise<usage_output> {
  return JsonGet(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/usage`
  );
}

export type start_input = WithClient<{ path: ProcessPath }>;
export type start_output = ResponseResult<Bytes>;
export async function start(input: start_input): Promise<start_output> {
  return RawPost(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/start`
  );
}

export type stop_input = WithClient<{ path: ProcessPath }>;
export type stop_output = ResponseResult<Bytes>;
export async function stop(input: stop_input): Promise<stop_output> {
  return RawPost(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/stop`
  );
}

export type restart_input = WithClient<{ path: ProcessPath }>;
export type restart_output = ResponseResult<Bytes>;
export async function restart(input: restart_input): Promise<restart_output> {
  return RawPost(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/restart`
  );
}

export type reload_input = WithClient<{ path: ProcessPath }>;
export type reload_output = ResponseResult<Bytes>;
export async function reload(input: reload_input): Promise<reload_output> {
  return RawPost(
    input,
    (path) => `${scope()}/${encodeURIComponent(path.process)}/reload`
  );
}
