import type { Group, User } from "../../common/info.js";
import type { ResponseResult } from "../../common/response.js";
import { JsonGet, type WithClient } from "../../common/utils/client.js";
import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope, type ContainerPath } from "../scope.js";

export function scope<Path extends ContainerPath>(path: Path) {
  return parentScope(path) + "/info";
}

export namespace users {
  export type users_input = WithClient<{ path: ContainerPath }>;
  export type users_output = ResponseResult<rust_types.Vec<User>>;
  export async function users(input: users_input): Promise<users_output> {
    return JsonGet(input, (path) => `${scope(path)}/users/users`);
  }

  export type groups_input = WithClient<{ path: ContainerPath }>;
  export type groups_output = ResponseResult<rust_types.Vec<Group>>;
  export async function groups(input: groups_input): Promise<groups_output> {
    return JsonGet(input, (path) => `${scope(path)}/users/groups`);
  }
}
