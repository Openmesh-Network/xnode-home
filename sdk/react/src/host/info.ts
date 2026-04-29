import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useHostInfoFlakeMetadata({
  client,
  flake,
  overrides,
}: UseQueryInput<
  xnode.host.info.flake.metadata_input,
  xnode.host.info.flake.metadata_output
>): UseQueryOutput<xnode.host.info.flake.metadata_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "info", "flake", flake, "metadata"],
      enabled: !!client && !!flake,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !flake) {
          return undefined;
        }

        return await xnode.host.info.flake.metadata({
          client,
          query: { flake },
        });
      },
    },
    overrides
  );
}

export function useHostInfoEval({
  client,
  statement,
  config,
  overrides,
}: UseQueryInput<
  xnode.host.info.eval_input,
  xnode.host.info.eval_output
>): UseQueryOutput<xnode.host.info.eval_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "info",
        "eval",
        statement,
        { config },
      ],
      enabled: !!client && !!statement,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client || !statement) {
          return undefined;
        }

        return await xnode.host.info.eval({
          client,
          query: { statement, config: config ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostInfoUsersUsers({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.info.users.users_input,
  xnode.host.info.users.users_output
>): UseQueryOutput<xnode.host.info.users.users_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "info", "users", "users"],
      enabled: !!client,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.info.users.users({
          client,
        });
      },
    },
    overrides
  );
}

export function useHostInfoUsersGroups({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.info.users.groups_input,
  xnode.host.info.users.groups_output
>): UseQueryOutput<xnode.host.info.users.groups_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "info", "users", "groups"],
      enabled: !!client,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!client) {
          return undefined;
        }

        return await xnode.host.info.users.groups({
          client,
        });
      },
    },
    overrides
  );
}
