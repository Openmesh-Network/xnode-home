import { type UseQueryInput, useQuery, type UseQueryOutput } from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

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
        client?.baseUrl ?? "",
        "container",
        container ?? "",
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
        client?.baseUrl ?? "",
        "container",
        container ?? "",
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
