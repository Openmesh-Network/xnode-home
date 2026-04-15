import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import { useQueryClient } from "@tanstack/react-query";

export function useHostProcessLogs({
  client,
  process,
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
      ],
      enabled: !!client && !!process,
      refetchInterval: 1_000, // 1 second
      queryFn: async () => {
        if (!client || !process) {
          return undefined;
        }

        return await xnode.host.process.logs({
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.start,
      onSuccess: (_, { client, path: { process } }) => {
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.stop,
      onSuccess: (_, { client, path: { process } }) => {
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.restart,
      onSuccess: (_, { client, path: { process } }) => {
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
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.process.reload,
      onSuccess: (_, { client, path: { process } }) => {
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
