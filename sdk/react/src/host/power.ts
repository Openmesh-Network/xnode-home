import {
  type UseMutationOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostPowerOff(
  input: UseMutationInput<
    xnode.host.power.off_input,
    xnode.host.power.off_output
  > = {}
): UseMutationOutput<xnode.host.power.off_input, xnode.host.power.off_output> {
  return useMutation(
    {
      mutationFn: xnode.host.power.off,
    },
    input?.overrides
  );
}

export function useHostPowerReboot(
  input: UseMutationInput<
    xnode.host.power.reboot_input,
    xnode.host.power.reboot_output
  > = {}
): UseMutationOutput<
  xnode.host.power.reboot_input,
  xnode.host.power.reboot_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.power.reboot,
    },
    input?.overrides
  );
}
