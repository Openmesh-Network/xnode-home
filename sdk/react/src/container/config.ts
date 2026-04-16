import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerConfigGet({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.container.config.get_input,
  xnode.container.config.get_output
>): UseQueryOutput<xnode.container.config.get_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "config",
        "get",
      ],
      enabled: !!client && !!container,
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.container.config.get({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useContainerConfigSet(
  input: UseMutationInput<
    xnode.container.config.set_input,
    xnode.container.config.set_output
  > = {}
): UseMutationOutput<
  xnode.container.config.set_input,
  xnode.container.config.set_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.config.set,
      onSuccess: (
        _data,
        { client, path: { container } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container, "config", "get"],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerConfigVersion({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.container.config.version_input,
  xnode.container.config.version_output
>): UseQueryOutput<xnode.container.config.version_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "config",
        "version",
      ],
      enabled: !!client && !!container,
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.container.config.version({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useContainerConfigUpdate(
  input: UseMutationInput<
    xnode.container.config.update_input,
    xnode.container.config.update_output
  > = {}
): UseMutationOutput<
  xnode.container.config.update_input,
  xnode.container.config.update_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.config.update,
      onSuccess: (
        _data,
        { client, path: { container } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "config",
              "version",
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerConfigBuild(
  input: UseMutationInput<
    xnode.container.config.build_input,
    xnode.container.config.build_output
  > = {}
): UseMutationOutput<
  xnode.container.config.build_input,
  xnode.container.config.build_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.config.build,
    },
    input?.overrides
  );
}

export function useContainerConfigApply(
  input: UseMutationInput<
    xnode.container.config.apply_input,
    xnode.container.config.apply_output
  > = {}
): UseMutationOutput<
  xnode.container.config.apply_input,
  xnode.container.config.apply_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.config.apply,
    },
    input?.overrides
  );
}
