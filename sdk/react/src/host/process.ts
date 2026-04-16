import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostProcessLogs({
  client,
  process,
  level,
  max,
  overrides,
}: UseQueryInput<
  xnode.host.process.logs_input,
  xnode.host.process.logs_output
>): UseQueryOutput<xnode.host.process.logs_output> {
  return useQuery(
    {
      queryKey: [
        "host",
        "process",
        "logs",
        client?.baseUrl ?? "",
        process ?? "",
        level ?? "",
        max ?? 0,
      ],

      enabled: !!client && !!process,
      refetchInterval: 1000,

      queryFn: async ({ client: queryClient }) => {
        if (!client || !process) return [];

        const previous =
          queryClient.getQueryData<xnode.host.process.logs_output>([
            "host",
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

        const next = await xnode.host.process.logs({
          client,
          path: { process },
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

export function useHostProcessStatus({
  client,
  process,
  overrides,
}: UseQueryInput<
  xnode.host.process.status_input,
  xnode.host.process.status_output
>): UseQueryOutput<xnode.host.process.status_output> {
  return useQuery(
    {
      queryKey: [
        "host",
        "process",
        "status",
        client?.baseUrl ?? "",
        process ?? "",
      ],
      enabled: !!client && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !process) {
          return undefined;
        }

        return await xnode.host.process.status({
          client,
          path: { process },
        });
      },
    },
    overrides
  );
}

export function useHostProcessUsage({
  client,
  process,
  overrides,
}: UseQueryInput<
  xnode.host.process.usage_input,
  xnode.host.process.usage_output
>): UseQueryOutput<xnode.host.process.usage_output> {
  return useQuery(
    {
      queryKey: [
        "host",
        "process",
        "usage",
        client?.baseUrl ?? "",
        process ?? "",
      ],
      enabled: !!client && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !process) {
          return undefined;
        }

        return await xnode.host.process.usage({
          client,
          path: { process },
        });
      },
    },
    overrides
  );
}

export function useHostProcessStart(
  input: UseMutationInput<
    xnode.host.process.start_input,
    xnode.host.process.start_output
  > = {}
): UseMutationOutput<
  xnode.host.process.start_input,
  xnode.host.process.start_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.process.start,
      onSuccess: (
        _data,
        { client, path: { process } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "process", client.baseUrl, process],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostProcessStop(
  input: UseMutationInput<
    xnode.host.process.stop_input,
    xnode.host.process.stop_output
  > = {}
): UseMutationOutput<
  xnode.host.process.stop_input,
  xnode.host.process.stop_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.process.stop,
      onSuccess: (
        _data,
        { client, path: { process } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "process", client.baseUrl, process],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostProcessRestart(
  input: UseMutationInput<
    xnode.host.process.restart_input,
    xnode.host.process.restart_output
  > = {}
): UseMutationOutput<
  xnode.host.process.restart_input,
  xnode.host.process.restart_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.process.restart,
      onSuccess: (
        _data,
        { client, path: { process } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "process", client.baseUrl, process],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostProcessReload(
  input: UseMutationInput<
    xnode.host.process.reload_input,
    xnode.host.process.reload_output
  > = {}
): UseMutationOutput<
  xnode.host.process.reload_input,
  xnode.host.process.reload_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.process.reload,
      onSuccess: (
        _data,
        { client, path: { process } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "process", client.baseUrl, process],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
