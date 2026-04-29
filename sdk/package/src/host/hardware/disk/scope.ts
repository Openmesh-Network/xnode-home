import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

type DiskPath = { disk: rust_types.String };

export type Path = DiskPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/disk/${path.disk}`;
}
