import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerInfoUsersUsers({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.info.users.users_input,
  xnode.host.info.users.users_output
>): UseQueryOutput<xnode.host.info.users.users_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl ?? "", "host", "info", "users", "users"],
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

export function useContainerInfoUsersGroups({
  client,
  overrides,
}: UseQueryInput<
  xnode.host.info.users.groups_input,
  xnode.host.info.users.groups_output
>): UseQueryOutput<xnode.host.info.users.groups_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl ?? "", "host", "info", "users", "groups"],
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
