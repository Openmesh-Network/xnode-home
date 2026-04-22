import { useQueryClient } from "@tanstack/react-query";
import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerProcessLogs({
  client,
  container,
  process,
  level,
  max,
  overrides,
}: UseQueryInput<
  xnode.container.process.logs_input,
  xnode.container.process.logs_output
>): UseQueryOutput<xnode.container.process.logs_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "process",
        process ?? "",
        "logs",
        level ?? "",
        max ?? 0,
      ],

      enabled: !!client && !!container && !!process,
      refetchInterval: 1000,

      queryFn: async ({ client: queryClient }) => {
        if (!client || !container || !process) return [];

        const previous =
          queryClient.getQueryData<xnode.container.process.logs_output>([
            "container",
            "process",
            "logs",
            client.baseUrl,
            process,
            level ?? "",
            max ?? 0,
          ]) ?? [];

        // All logs before this timestamp we've already received
        const lastTimestamp =
          previous.length > 1
            ? previous[previous.length - 1]?.timestamp
            : undefined;
        // We only retain the logs from before this log, this log and everything after will be resent
        const firstLogOfTimestamp =
          lastTimestamp !== undefined
            ? previous.findIndex((log) => log.timestamp === lastTimestamp)
            : 0;

        const next = await xnode.container.process.logs({
          client,
          path: { container, process },
          query: {
            after: lastTimestamp ?? null,
            level: level ?? null,
            max: max ?? null,
          },
        });

        return [...previous.slice(0, firstLogOfTimestamp), ...next].slice(
          max ? -max : undefined
        );
      },
    },
    overrides
  );
}

export function useContainerProcessStatus({
  client,
  container,
  process,
  overrides,
}: UseQueryInput<
  xnode.container.process.status_input,
  xnode.container.process.status_output
>): UseQueryOutput<xnode.container.process.status_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "process",
        process ?? "",
        "status",
      ],
      enabled: !!client && !!container && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !container || !process) {
          return undefined;
        }

        return await xnode.container.process.status({
          client,
          path: { container, process },
        });
      },
    },
    overrides
  );
}

export function useContainerProcessUsage({
  client,
  container,
  process,
  overrides,
}: UseQueryInput<
  xnode.container.process.usage_input,
  xnode.container.process.usage_output
>): UseQueryOutput<xnode.container.process.usage_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "process",
        process ?? "",
        "usage",
      ],
      enabled: !!client && !!container && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !container || !process) {
          return undefined;
        }

        return await xnode.container.process.usage({
          client,
          path: { container, process },
        });
      },
    },
    overrides
  );
}

export function useContainerProcessStart(
  input: UseMutationInput<
    xnode.container.process.start_input,
    xnode.container.process.start_output
  > = {}
): UseMutationOutput<
  xnode.container.process.start_input,
  xnode.container.process.start_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.process.start,
      onSuccess: (_data, { client, path: { container, process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "process",
              process,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerProcessStop(
  input: UseMutationInput<
    xnode.container.process.stop_input,
    xnode.container.process.stop_output
  > = {}
): UseMutationOutput<
  xnode.container.process.stop_input,
  xnode.container.process.stop_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.process.stop,
      onSuccess: (_data, { client, path: { container, process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "process",
              process,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerProcessRestart(
  input: UseMutationInput<
    xnode.container.process.restart_input,
    xnode.container.process.restart_output
  > = {}
): UseMutationOutput<
  xnode.container.process.restart_input,
  xnode.container.process.restart_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.process.restart,
      onSuccess: (_data, { client, path: { container, process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "process",
              process,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerProcessReload(
  input: UseMutationInput<
    xnode.container.process.reload_input,
    xnode.container.process.reload_output
  > = {}
): UseMutationOutput<
  xnode.container.process.reload_input,
  xnode.container.process.reload_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.container.process.reload,
      onSuccess: (_data, { client, path: { container, process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "process",
              process,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
