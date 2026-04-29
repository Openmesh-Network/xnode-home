import { scope as parentScope } from "../scope.js";

type ContainerPath = {
  container: string;
};

export type Path = ContainerPath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/container/${path.container}`;
}
