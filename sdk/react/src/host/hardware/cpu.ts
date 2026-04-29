import {
  type UseQueryInput,
  useQuery,
  type UseQueryOutput,
} from "../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostHardwareCpu({
  client,
  usage,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.cpu.cpu_input,
  xnode.host.hardware.cpu.cpu_output
>): UseQueryOutput<xnode.host.hardware.cpu.cpu_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "cpu", { usage }],
      enabled: !!client,
      refetchInterval: usage ? 1_000 : false, // 1 second or never
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.hardware.cpu.cpu({
          client,
          query: { usage: usage ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareCpuInfo({
  client,
  cpu,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.cpu.info_input,
  xnode.host.hardware.cpu.info_output
>): UseQueryOutput<xnode.host.hardware.cpu.info_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "cpu", cpu, "info"],
      enabled: !!client && !!cpu,
      queryFn: async () => {
        if (!client || !cpu) {
          return undefined;
        }

        return await xnode.host.hardware.cpu.info({
          client,
          path: { cpu },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareCpuUsage({
  client,
  cpu,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.cpu.usage_input,
  xnode.host.hardware.cpu.usage_output
>): UseQueryOutput<xnode.host.hardware.cpu.usage_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "cpu", cpu, "usage"],
      enabled: !!client && !!cpu,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !cpu) {
          return undefined;
        }

        return await xnode.host.hardware.cpu.usage({
          client,
          path: { cpu },
        });
      },
    },
    overrides
  );
}
