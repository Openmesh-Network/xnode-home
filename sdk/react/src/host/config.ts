import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostConfigGet({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.config.get_input,
  xnode.host.config.get_output
>): UseQueryOutput<xnode.host.config.get_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl ?? "", "host", "config", "get"],
      enabled: !!client,
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.config.get({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostConfigSet(
  input: UseMutationInput<
    xnode.host.config.set_input,
    xnode.host.config.set_output
  > = {}
): UseMutationOutput<
  xnode.host.config.set_input,
  xnode.host.config.set_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.config.set,
      onSuccess: (
        _data,
        { client },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "config", "get"],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostConfigVersion({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.config.version_input,
  xnode.host.config.version_output
>): UseQueryOutput<xnode.host.config.version_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl ?? "", "host", "config", "version"],
      enabled: !!client,
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.config.version({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostConfigUpdate(
  input: UseMutationInput<
    xnode.host.config.update_input,
    xnode.host.config.update_output
  > = {}
): UseMutationOutput<
  xnode.host.config.update_input,
  xnode.host.config.update_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.config.update,
      onSuccess: (
        _data,
        { client },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "config", "version"],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostConfigBuild(
  input: UseMutationInput<
    xnode.host.config.build_input,
    xnode.host.config.build_output
  > = {}
): UseMutationOutput<
  xnode.host.config.build_input,
  xnode.host.config.build_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.config.build,
    },
    input?.overrides
  );
}

export function useHostConfigApply(
  input: UseMutationInput<
    xnode.host.config.apply_input,
    xnode.host.config.apply_output
  > = {}
): UseMutationOutput<
  xnode.host.config.apply_input,
  xnode.host.config.apply_output
> {
  return useMutation(
    {
      mutationFn: xnode.host.config.apply,
    },
    input?.overrides
  );
}
