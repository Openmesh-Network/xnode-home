import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerListProcess({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.container.list.process_input,
  xnode.container.list.process_output
>): UseQueryOutput<xnode.container.list.process_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "list",
        "process",
      ],
      enabled: !!client && !!container,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.container.list.process({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}
