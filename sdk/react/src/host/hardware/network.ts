import {
  type UseQueryInput,
  useQuery,
  type UseQueryOutput,
} from "../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostHardwareNetwork({
  client,
  usage,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.network.network_input,
  xnode.host.hardware.network.network_output
>): UseQueryOutput<xnode.host.hardware.network.network_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "network", { usage }],
      enabled: !!client,
      refetchInterval: usage ? 1_000 : false, // 1 second or never
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.hardware.network.network({
          client,
          query: { usage: usage ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareNetworkInfo({
  client,
  network,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.network.info_input,
  xnode.host.hardware.network.info_output
>): UseQueryOutput<xnode.host.hardware.network.info_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "hardware",
        "network",
        network,
        "info",
      ],
      enabled: !!client && !!network,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !network) {
          return undefined;
        }

        return await xnode.host.hardware.network.info({
          client,
          path: { network },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareNetworkUsage({
  client,
  network,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.network.usage_input,
  xnode.host.hardware.network.usage_output
>): UseQueryOutput<xnode.host.hardware.network.usage_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "hardware",
        "network",
        network,
        "usage",
      ],
      enabled: !!client && !!network,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !network) {
          return undefined;
        }

        return await xnode.host.hardware.network.usage({
          client,
          path: { network },
        });
      },
    },
    overrides
  );
}
