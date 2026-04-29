import type { rust_types } from "../../common/utils/index.js";
import type {
  FolderItem,
  Metadata,
  PathQuery,
  Permission,
  ReadFolderOptions,
  Size,
  SourceDestinationData,
} from "../../common/file.js";
import type { ResponseResult } from "../../common/response.js";
import type { Bytes } from "../../common/utils/bytes.js";
import {
  JsonGet,
  RawGet,
  RawPost,
  type WithClient,
} from "../../common/utils/client.js";
import { scope, type Path } from "./scope.js";

export type metadata_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type metadata_output = ResponseResult<Metadata>;
export async function metadata(
  input: metadata_input
): Promise<metadata_output> {
  return JsonGet(input, (path) => `${scope(path)}/metadata`);
}

export type size_input = WithClient<{ path: Path; query: PathQuery }>;
export type size_output = ResponseResult<Size>;
export async function size(input: size_input): Promise<size_output> {
  return JsonGet(input, (path) => `${scope(path)}/size`);
}

export type move_input = WithClient<{
  path: Path;
  data: SourceDestinationData;
}>;
export type move_output = ResponseResult<Bytes>;
export async function move(input: move_input): Promise<move_output> {
  return RawPost(input, (path) => `${scope(path)}/move`);
}

export type remove_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type remove_output = ResponseResult<Bytes>;
export async function remove(input: remove_input): Promise<remove_output> {
  return RawPost(input, (path) => `${scope(path)}/remove`);
}

export type copy_input = WithClient<{
  path: Path;
  data: SourceDestinationData;
}>;
export type copy_output = ResponseResult<Bytes>;
export async function copy(input: copy_input): Promise<copy_output> {
  return RawPost(input, (path) => `${scope(path)}/copy`);
}

export type read_file_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type read_file_output = ResponseResult<Bytes>;
export async function read_file(
  input: read_file_input
): Promise<read_file_output> {
  return RawGet(input, (path) => `${scope(path)}/read_file`);
}

export type write_file_input = WithClient<{
  path: Path;
  query: PathQuery;
  data: Bytes;
}>;
export type write_file_output = ResponseResult<Bytes>;
export async function write_file(
  input: write_file_input
): Promise<write_file_output> {
  return RawPost(input, (path) => `${scope(path)}/write_file`);
}

export type read_folder_input = WithClient<{
  path: Path;
  query: PathQuery & ReadFolderOptions;
}>;
export type read_folder_output = ResponseResult<rust_types.Vec<FolderItem>>;
export async function read_folder(
  input: read_folder_input
): Promise<read_folder_output> {
  return JsonGet(input, (path) => `${scope(path)}/read_folder`);
}

export type create_folder_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type create_folder_output = ResponseResult<Bytes>;
export async function create_folder(
  input: create_folder_input
): Promise<create_folder_output> {
  return RawPost(input, (path) => `${scope(path)}/create_folder`);
}

export type read_link_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type read_link_output = ResponseResult<String>;
export async function read_link(
  input: read_link_input
): Promise<read_link_output> {
  return JsonGet(input, (path) => `${scope(path)}/read_link`);
}

export type write_link_input = WithClient<{
  path: Path;
  data: SourceDestinationData;
}>;
export type write_link_output = ResponseResult<Bytes>;
export async function write_link(
  input: write_link_input
): Promise<write_link_output> {
  return RawPost(input, (path) => `${scope(path)}/write_link`);
}

export type get_permissions_input = WithClient<{
  path: Path;
  query: PathQuery;
}>;
export type get_permissions_output = ResponseResult<rust_types.Vec<Permission>>;
export async function get_permissions(
  input: get_permissions_input
): Promise<get_permissions_output> {
  return JsonGet(input, (path) => `${scope(path)}/get_permissions`);
}

export type set_permissions_input = WithClient<{
  path: Path;
  query: PathQuery;
  data: rust_types.Vec<Permission>;
}>;
export type set_permissions_output = ResponseResult<Bytes>;
export async function set_permissions(
  input: set_permissions_input
): Promise<set_permissions_output> {
  return RawPost(input, (path) => `${scope(path)}/set_permissions`);
}
