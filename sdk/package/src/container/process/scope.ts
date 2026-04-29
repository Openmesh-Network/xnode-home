import type { rust_types } from "../../common/utils/index.js";
import { scope as parentScope, type Path as ParentPath } from "../scope.js";

type ProcessPath = { process: rust_types.String };

export type Path = ParentPath & ProcessPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope(path)}/process/${encodeURIComponent(path.process)}`;
}
