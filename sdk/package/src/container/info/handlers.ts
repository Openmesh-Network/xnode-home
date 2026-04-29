import type { Group, User } from "../../common/info.js";
import type { EvalQuery, FlakeMetadata, FlakeQuery } from "../../common/nix.js";
import type { ResponseResult } from "../../common/response.js";
import { JsonGet, type WithClient } from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope, type Path } from "./scope.js";

export namespace flake {
  export type metadata_input = WithClient<{
    path: Path;
    query: FlakeQuery;
  }>;
  export type metadata_output = ResponseResult<FlakeMetadata>;
  export async function metadata(
    input: metadata_input
  ): Promise<metadata_output> {
    return JsonGet(input, (path) => `${scope(path)}/flake/metadata`);
  }
}

export type eval_input = WithClient<{ path: Path; query: EvalQuery }>;
export type eval_output = ResponseResult<rust_types.String>;
async function _eval(input: eval_input): Promise<eval_output> {
  return JsonGet(input, (path) => `${scope(path)}/eval`);
}
export { _eval as eval };

export namespace users {
  export type users_input = WithClient<{ path: Path }>;
  export type users_output = ResponseResult<rust_types.Vec<User>>;
  export async function users(input: users_input): Promise<users_output> {
    return JsonGet(input, (path) => `${scope(path)}/users/users`);
  }

  export type groups_input = WithClient<{ path: Path }>;
  export type groups_output = ResponseResult<rust_types.Vec<Group>>;
  export async function groups(input: groups_input): Promise<groups_output> {
    return JsonGet(input, (path) => `${scope(path)}/users/groups`);
  }
}
