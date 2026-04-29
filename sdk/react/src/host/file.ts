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

export function useHostFileMetadata({
  client,
  path,
  overrides,
}: UseQueryInput<
  xnode.host.file.metadata_input,
  xnode.host.file.metadata_output
>): UseQueryOutput<xnode.host.file.metadata_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "file", path, "metadata"],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.metadata({
          client,
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useHostFileSize({
  client,
  path,
  overrides,
}: UseQueryInput<
  xnode.host.file.size_input,
  xnode.host.file.size_output
>): UseQueryOutput<xnode.host.file.size_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "file", path, "size"],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.size({
          client,
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useHostFileMove(
  input: UseMutationInput<
    xnode.host.file.move_input,
    xnode.host.file.move_output
  > = {}
): UseMutationOutput<xnode.host.file.move_input, xnode.host.file.move_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.move,
      onSuccess: (_data, { client, data: { source, destination } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", source],
          }),
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", destination],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileRemove(
  input: UseMutationInput<
    xnode.host.file.remove_input,
    xnode.host.file.remove_output
  > = {}
): UseMutationOutput<
  xnode.host.file.remove_input,
  xnode.host.file.remove_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.remove,
      onSuccess: (_data, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileCopy(
  input: UseMutationInput<
    xnode.host.file.copy_input,
    xnode.host.file.copy_output
  > = {}
): UseMutationOutput<xnode.host.file.copy_input, xnode.host.file.copy_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.copy,
      onSuccess: (_data, { client, data: { destination } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", destination],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileReadFile({
  client,
  path,
  overrides,
}: UseQueryInput<
  xnode.host.file.read_file_input,
  xnode.host.file.read_file_output
>): UseQueryOutput<xnode.host.file.read_file_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "file", path, "file", "read"],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.read_file({
          client,
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useHostFileWriteFile(
  input: UseMutationInput<
    xnode.host.file.write_file_input,
    xnode.host.file.write_file_output
  > = {}
): UseMutationOutput<
  xnode.host.file.write_file_input,
  xnode.host.file.write_file_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.write_file,
      onSuccess: (_data, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileReadFolder({
  client,
  path,
  metadata,
  overrides,
}: UseQueryInput<
  xnode.host.file.read_folder_input,
  xnode.host.file.read_folder_output
>): UseQueryOutput<xnode.host.file.read_folder_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl,
        "host",
        "file",
        path,
        "folder",
        "read",
        { metadata },
      ],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.read_folder({
          client,
          query: { path, metadata: metadata ?? null },
        });
      },
    },
    overrides
  );
}

export function useHostFileCreateFolder(
  input: UseMutationInput<
    xnode.host.file.create_folder_input,
    xnode.host.file.create_folder_output
  > = {}
): UseMutationOutput<
  xnode.host.file.create_folder_input,
  xnode.host.file.create_folder_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.create_folder,
      onSuccess: (_data, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileReadLink({
  client,
  path,
  overrides,
}: UseQueryInput<
  xnode.host.file.read_link_input,
  xnode.host.file.read_link_output
>): UseQueryOutput<xnode.host.file.read_link_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "file", path, "link", "read"],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.read_link({
          client,
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useHostFileWriteLink(
  input: UseMutationInput<
    xnode.host.file.write_link_input,
    xnode.host.file.write_link_output
  > = {}
): UseMutationOutput<
  xnode.host.file.write_link_input,
  xnode.host.file.write_link_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.write_link,
      onSuccess: (_data, { client, data: { destination } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "host", "file", destination],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useHostFileGetPermissions({
  client,
  path,
  overrides,
}: UseQueryInput<
  xnode.host.file.get_permissions_input,
  xnode.host.file.get_permissions_output
>): UseQueryOutput<xnode.host.file.get_permissions_output> {
  return useQuery(
    {
      queryKey: [client?.baseUrl, "host", "file", path, "permissions", "read"],
      enabled: !!client && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !path) {
          return undefined;
        }

        return await xnode.host.file.get_permissions({
          client,
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useHostFileSetPermissions(
  input: UseMutationInput<
    xnode.host.file.set_permissions_input,
    xnode.host.file.set_permissions_output
  > = {}
): UseMutationOutput<
  xnode.host.file.set_permissions_input,
  xnode.host.file.set_permissions_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.host.file.set_permissions,
      onSuccess: (_data, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "host",
              "file",
              path,
              "permissions",
              "read",
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
