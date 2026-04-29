import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

type NetworkPath = { network: rust_types.String };

export type Path = NetworkPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/network/${path.network}`;
}
