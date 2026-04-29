import { scope as parentScope, type Path as ParentPath } from "../scope.js";

export type Path = ParentPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope(path)}/config`;
}
