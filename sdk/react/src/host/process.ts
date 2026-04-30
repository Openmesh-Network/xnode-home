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

export function useHostProcess({
  client,
  status,
  usage,
  overrides,
}: UseQueryInput<
  xnode.host.process.process_input,
  xnode.host.process.process_output
>): UseQueryOutput<xnode.host.process.process_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "process", { status, usage }],
      enabled: !!client,
      refetchInterval: usage || status ? 1_000 : 10_000, // 1 or 10 seconds
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.process.process({
          client,
          query: { status: status ?? null, usage: usage ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostProcessInfo({
  client,
  process,
  overrides,
}: UseQueryInput<
  xnode.host.process.info_input,
  xnode.host.process.info_output
>): UseQueryOutput<xnode.host.process.info_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "process", process, "info"],
      enabled: !!client && !!process,
      refetchInterval: 60_000, // 60 second
      queryFn: async () => {
        if (!client || !process) {
          return undefined;
        }

        return await xnode.host.process.info({
          client,
          path: { process },
        });
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
      queryKey: [client?.baseUrl, "host", "process", process, "status"],
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
        client?.baseUrl,
        "host",
        "process",
        process,
        "logs",
        { level, max },
      ],
      enabled: !!client && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async ({ client: queryClient }) => {
        if (!client || !process) {
          return undefined;
        }

        const previous =
          queryClient.getQueryData<xnode.host.process.logs_output>([
            client.baseUrl,
            "host",
            "process",
            process,
            "logs",
            { level, max },
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
      queryKey: [client?.baseUrl, "host", "process", process, "usage"],
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.start,
      onSuccess: (_data, { client, path: { process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "process", process],
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.stop,
      onSuccess: (_data, { client, path: { process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "process", process],
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.restart,
      onSuccess: (_data, { client, path: { process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "process", process],
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.reload,
      onSuccess: (_data, { client, path: { process } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "process", process],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
