import type { rust_types } from "../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

type CpuPath = { cpu: rust_types.String };

export type Path = CpuPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/cpu/${path.cpu}`;
}
