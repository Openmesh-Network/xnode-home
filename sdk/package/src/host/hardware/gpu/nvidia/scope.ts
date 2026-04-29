import type { rust_types } from "../../../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

type GpuPath = { gpu: rust_types.String };

export type Path = GpuPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/nvidia/${path.gpu}`;
}
