import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope } from "../scope.js";

type ProcessPath = { process: rust_types.String };

export type Path = ProcessPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/process/${encodeURIComponent(path.process)}`;
}
