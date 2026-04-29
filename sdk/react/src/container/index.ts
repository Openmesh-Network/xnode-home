import { xnode } from "@openmesh-network/xnode-manager-sdk";
import {
  useMutation,
  useQuery,
  type UseMutationInput,
  type UseMutationOutput,
  type UseQueryInput,
  type UseQueryOutput,
} from "../utils.js";
import { useQueryClient } from "@tanstack/react-query";

export * from "./config.js";
export * from "./file.js";
export * from "./info.js";
export * from "./process.js";

export function useContainer({
  client,
  overrides,
}: UseQueryInput<
  xnode.container.container_input,
  xnode.container.container_output
>): UseQueryOutput<xnode.container.container_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "container"],
      enabled: !!client,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.container.container({
          client,
        });
      },
    },
    overrides
  );
}

export function useContainerCreate(
  input: UseMutationInput<
    xnode.container.create_input,
    xnode.container.create_output
  > = {}
): UseMutationOutput<
  xnode.container.create_input,
  xnode.container.create_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.create,
      onSuccess: (_data, { client }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "list", "container"],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerRemove(
  input: UseMutationInput<
    xnode.container.remove_input,
    xnode.container.remove_output
  > = {}
): UseMutationOutput<
  xnode.container.remove_input,
  xnode.container.remove_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.remove,
      onSuccess: (_data, { client, path: { container } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container],
          }),
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "list", "container"],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
