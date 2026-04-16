import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerListProcess({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.list.process_input,
  xnode.host.list.process_output
>): UseQueryOutput<xnode.host.list.process_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl ?? "", "host", "list", "process"],
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
