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

export function useHostPermissionContainerGet({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.host.permission.container.get_input,
  xnode.host.permission.container.get_output
>): UseQueryOutput<xnode.host.permission.container.get_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "permission",
        "container",
        container,
        "get",
      ],
      enabled: !!client && !!container,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.host.permission.container.get({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useHostPermissionContainerSet(
  input: UseMutationInput<
    xnode.host.permission.container.set_input,
    xnode.host.permission.container.set_output
  > = {}
): UseMutationOutput<
  xnode.host.permission.container.set_input,
  xnode.host.permission.container.set_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.permission.container.set,
      onSuccess: (_data, { client, path: { container } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "host",
              "permission",
              "container",
              container,
              "get",
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
