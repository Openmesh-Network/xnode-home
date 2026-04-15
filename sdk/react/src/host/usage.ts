import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostUsageCpu({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.usage.cpu_input,
  xnode.host.usage.cpu_output
>): UseQueryOutput<xnode.host.usage.cpu_output> {
  return useQuery(
    {
      queryKey: ["host", "usage", "cpu", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.usage.cpu({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostUsageMemory({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.usage.memory_input,
  xnode.host.usage.memory_output
>): UseQueryOutput<xnode.host.usage.memory_output> {
  return useQuery(
    {
      queryKey: ["host", "usage", "memory", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.usage.memory({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostUsageDisk({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.usage.disk_input,
  xnode.host.usage.disk_output
>): UseQueryOutput<xnode.host.usage.disk_output> {
  return useQuery(
    {
      queryKey: ["host", "usage", "disk", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.usage.disk({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostUsageNetwork({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.usage.network_input,
  xnode.host.usage.network_output
>): UseQueryOutput<xnode.host.usage.network_output> {
  return useQuery(
    {
      queryKey: ["host", "usage", "network", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.usage.network({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostUsageGpu({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.usage.gpu_input,
  xnode.host.usage.gpu_output
>): UseQueryOutput<xnode.host.usage.gpu_output> {
  return useQuery(
    {
      queryKey: ["host", "usage", "gpu", client?.baseUrl ?? ""],
      enabled: !!client,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.usage.gpu({
          client,
        });
      },
    },
    overrides
  );
}
