import {
  type UseQueryInput,
  useQuery,
  type UseQueryOutput,
} from "../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostHardwareDisk({
  client,
  usage,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.disk.disk_input,
  xnode.host.hardware.disk.disk_output
>): UseQueryOutput<xnode.host.hardware.disk.disk_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "disk", { usage }],
      enabled: !!client,
      refetchInterval: usage ? 1_000 : false, // 1 second or never
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.hardware.disk.disk({
          client,
          query: { usage: usage ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareDiskUsage({
  client,
  disk,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.disk.usage_input,
  xnode.host.hardware.disk.usage_output
>): UseQueryOutput<xnode.host.hardware.disk.usage_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "disk", disk, "usage"],
      enabled: !!client && !!disk,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !disk) {
          return undefined;
        }

        return await xnode.host.hardware.disk.usage({
          client,
          path: { disk },
        });
      },
    },
    overrides
  );
}
