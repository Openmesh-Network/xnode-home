import type { ResponseResult } from "../../common/response.js";
import { JsonGet, type WithClient } from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";
import type {
  CpuUsage,
  DiskUsage,
  GpuUsage,
  MemoryUsage,
  NetworkUsage,
} from "./models.js";

export function scope() {
  return parentScope() + "/usage";
}

export type cpu_input = WithClient<{}>;
export type cpu_output = ResponseResult<rust_types.Vec<CpuUsage>>;
export async function cpu(input: cpu_input): Promise<cpu_output> {
  return JsonGet(input, `${scope()}/cpu`);
}

export type memory_input = WithClient<{}>;
export type memory_output = ResponseResult<MemoryUsage>;
export async function memory(input: memory_input): Promise<memory_output> {
  return JsonGet(input, `${scope()}/memory`);
}

export type disk_input = WithClient<{}>;
export type disk_output = ResponseResult<rust_types.Vec<DiskUsage>>;
export async function disk(input: disk_input): Promise<disk_output> {
  return JsonGet(input, `${scope()}/disk`);
}

export type network_input = WithClient<{}>;
export type network_output = ResponseResult<rust_types.Vec<NetworkUsage>>;
export async function network(input: network_input): Promise<network_output> {
  return JsonGet(input, `${scope()}/network`);
}

export type gpu_input = WithClient<{}>;
export type gpu_output = ResponseResult<rust_types.Vec<GpuUsage>>;
export async function gpu(input: gpu_input): Promise<gpu_output> {
  return JsonGet(input, `${scope()}/gpu`);
}
