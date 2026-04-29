import {
  type UseQueryInput,
  useQuery,
  type UseQueryOutput,
} from "../../../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostHardwareGpuNvidia({
  client,
  usage,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.gpu.nvidia.nvidia_input,
  xnode.host.hardware.gpu.nvidia.nvidia_output
>): UseQueryOutput<xnode.host.hardware.gpu.nvidia.nvidia_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "hardware",
        "gpu",
        "nvidia",
        { usage },
      ],
      enabled: !!client,
      refetchInterval: usage ? 1_000 : false, // 1 second or never
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.hardware.gpu.nvidia.nvidia({
          client,
          query: { usage: usage ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostHardwareGpuNvidiaInfo({
  client,
  gpu,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.gpu.nvidia.info_input,
  xnode.host.hardware.gpu.nvidia.info_output
>): UseQueryOutput<xnode.host.hardware.gpu.nvidia.info_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "gpu", gpu, "info"],
      enabled: !!client && !!gpu,
      queryFn: async () => {
        if (!client || !gpu) {
          return undefined;
        }

        return await xnode.host.hardware.gpu.nvidia.info({
          client,
          path: { gpu },
        });
      },
    },
    overrides
  );
}

export function useHostHardwaregpuUsage({
  client,
  gpu,
  overrides,
}: UseQueryInput<
  xnode.host.hardware.gpu.nvidia.usage_input,
  xnode.host.hardware.gpu.nvidia.usage_output
>): UseQueryOutput<xnode.host.hardware.gpu.nvidia.usage_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "hardware", "gpu", gpu, "usage"],
      enabled: !!client && !!gpu,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !gpu) {
          return undefined;
        }

        return await xnode.host.hardware.gpu.nvidia.usage({
          client,
          path: { gpu },
        });
      },
    },
    overrides
  );
}
