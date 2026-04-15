import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostListProcess({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.list.process_input,
  xnode.host.list.process_output
>): UseQueryOutput<xnode.host.list.process_output> {
  return useQuery(
    {
      queryKey: ["host", "list", "process", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.list.process({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostListContainer({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.list.container_input,
  xnode.host.list.container_output
>): UseQueryOutput<xnode.host.list.container_output> {
  return useQuery(
    {
      queryKey: ["host", "list", "container", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.list.container({
          client,
        });
      },
    },
    overrides
  );
}
