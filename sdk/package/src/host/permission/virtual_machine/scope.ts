import { scope as parentScope } from "../scope.js";

type VirtualMachinePath = {
  virtual_machine: string;
};

export type Path = VirtualMachinePath;

export function scope<P extends Path>(path: P) {
  return `${parentScope()}/virtual-machine/${path.virtual_machine}`;
}
