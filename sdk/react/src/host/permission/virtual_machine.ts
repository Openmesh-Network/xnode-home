import { useQueryClient } from "@tanstack/react-query";
import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostPermissionVirtualMachineGet({
  client,
  virtual_machine,
  overrides,
}: UseQueryInput<
  xnode.host.permission.virtual_machine.get_input,
  xnode.host.permission.virtual_machine.get_output
>): UseQueryOutput<xnode.host.permission.virtual_machine.get_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "permission",
        "virtual_machine",
        virtual_machine,
        "get",
      ],
      enabled: !!client && !!virtual_machine,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !virtual_machine) {
          return undefined;
        }

        return await xnode.host.permission.virtual_machine.get({
          client,
          path: { virtual_machine },
        });
      },
    },
    overrides
  );
}

export function useHostPermissionVirtualMachineSet(
  input: UseMutationInput<
    xnode.host.permission.virtual_machine.set_input,
    xnode.host.permission.virtual_machine.set_output
  > = {}
): UseMutationOutput<
  xnode.host.permission.virtual_machine.set_input,
  xnode.host.permission.virtual_machine.set_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.permission.virtual_machine.set,
      onSuccess: (_data, { client, path: { virtual_machine } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "host",
              "permission",
              "virtual_machine",
              virtual_machine,
              "get",
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
