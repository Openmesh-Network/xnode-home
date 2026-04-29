import {
  type UseQueryInput,
  useQuery,
  type UseQueryOutput,
} from "../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostHardwareMemoryUsage({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.memory.usage_input,
  xnode.host.hardware.memory.usage_output
>): UseQueryOutput<xnode.host.hardware.memory.usage_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "memory", "usage"],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.hardware.memory.usage({
          client,
        });
      },
    },
    overrides
  );
}
