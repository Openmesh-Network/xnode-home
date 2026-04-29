import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerInfoFlakeMetadata({
  client,
  container,
  flake,
  overrides,
}: UseQueryInput<
  xnode.container.info.flake.metadata_input,
  xnode.container.info.flake.metadata_output
>): UseQueryOutput<xnode.container.info.flake.metadata_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "container",
        container,
        "info",
        "flake",
        flake,
        "metadata",
      ],
      enabled: !!client && !!container && !!flake,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !container || !flake) {
          return undefined;
        }

        return await xnode.container.info.flake.metadata({
          client,
          path: { container },
          query: { flake },
        });
      },
    },
    overrides
  );
}

export function useContainerInfoEval({
  client,
  container,
  statement,
  config,
  overrides,
}: UseQueryInput<
  xnode.container.info.eval_input,
  xnode.container.info.eval_output
>): UseQueryOutput<xnode.container.info.eval_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "container",
        container,
        "info",
        "eval",
        statement,
        { config },
      ],
      enabled: !!client && !!container && !!statement,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !container || !statement) {
          return undefined;
        }

        return await xnode.container.info.eval({
          client,
          path: { container },
          query: { statement, config: config ?? null },
        });
      },
    },
    overrides
  );
}

export function useContainerInfoUsersUsers({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.container.info.users.users_input,
  xnode.container.info.users.users_output
>): UseQueryOutput<xnode.container.info.users.users_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "container",
        container,
        "info",
        "users",
        "users",
      ],
      enabled: !!client && !!container,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.container.info.users.users({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useContainerInfoUsersGroups({
  client,
  container,
  overrides,
}: UseQueryInput<
  xnode.container.info.users.groups_input,
  xnode.container.info.users.groups_output
>): UseQueryOutput<xnode.container.info.users.groups_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "container",
        container,
        "info",
        "users",
        "groups",
      ],
      enabled: !!client && !!container,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !container) {
          return undefined;
        }

        return await xnode.container.info.users.groups({
          client,
          path: { container },
        });
      },
    },
    overrides
  );
}
