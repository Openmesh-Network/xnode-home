import { scope as parentScope } from "../scope.js";

export function scope() {
  return `${parentScope()}/info`;
}
