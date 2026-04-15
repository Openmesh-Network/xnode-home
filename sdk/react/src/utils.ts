import { xnode } from "@openmesh-network/xnode-manager-sdk";
import {
  type UseQueryOptions,
  useQuery as useTanstackQuery,
  type UseQueryResult as TanstackUseQueryResult,
  type UseMutationResult as TanstackUseMutationResult,
  type UseMutationOptions,
  useMutation as TanstackUseMutation,
} from "@tanstack/react-query";

export type QueryOverrides<Output> = Partial<
  UseQueryOptions<Output | undefined>
>;

export type UseQueryInput<
  Input extends {
    client: xnode.common.utils.client.Client;
    path?: Path;
    query?: Query;
  },
  Output,
  Path = {},
  Query = {},
> = Partial<Input["path"]> &
  Partial<Input["query"]> & {
    client?: xnode.common.utils.client.Client;
    overrides?: QueryOverrides<Output>;
  };

export type UseQueryOutput<Data> = TanstackUseQueryResult<
  NoInfer<Data | undefined>,
  Error
>;

export function useQuery<Output>(
  options: UseQueryOptions<Output | undefined>,
  overrides: QueryOverrides<Output> | undefined
): UseQueryOutput<Output> {
  return useTanstackQuery({
    ...options,
    ...overrides,
    enabled: options.enabled !== false && overrides?.enabled !== false,
  });
}

export type MutationOverrides<Input, Output> = UseMutationOptions<
  Output,
  Error,
  Input
>;

export type UseMutationInput<Input, Output> = {
  overrides?: MutationOverrides<Input, Output>;
};

export type UseMutationOutput<Input, Output> = TanstackUseMutationResult<
  Output,
  Error,
  Input
>;

export function useMutation<Input, Output>(
  options: UseMutationOptions<Output, Error, Input>,
  overrides: MutationOverrides<Input, Output> | undefined
): UseMutationOutput<Input, Output> {
  return TanstackUseMutation({
    ...options,
    ...overrides,
    onSuccess(data, variables, onMutateResult, context) {
      overrides?.onSuccess?.(data, variables, onMutateResult, context);
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export async function awaitCommand({
  client,
  command,
  pollInterval,
}: {
  client: xnode.common.utils.client.Client;
  command: xnode.common.command.ResponseCommand;
  pollInterval?: number; // In milliseconds, default 1000 (1 second)
}) {
  let status: xnode.common.process.Status | undefined;
  while (!status || status.running) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
    status = await xnode.host.process
      .status({ client, path: { process: command.id } })
      .catch(() => undefined);
  }
}
