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
      queryKey: ["host", "file", "metadata", client?.baseUrl ?? "", path ?? ""],
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
      queryKey: ["host", "file", "size", client?.baseUrl ?? "", path ?? ""],
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
      onSuccess: (_, { client, data: { source, destination } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, source],
          }),
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, destination],
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
      onSuccess: (_, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, path],
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
      onSuccess: (_, { client, data: { destination } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, destination],
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
      queryKey: [
        "host",
        "file",
        "read",
        "file",
        client?.baseUrl ?? "",
        path ?? "",
      ],
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
      onSuccess: (_, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, path],
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
        "host",
        "file",
        "read",
        "folder",
        client?.baseUrl ?? "",
        path ?? "",
        metadata ?? false,
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
      onSuccess: (_, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["host", "file", client.baseUrl, path],
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
      queryKey: [
        "host",
        "file",
        "read",
        "link",
        client?.baseUrl ?? "",
        path ?? "",
      ],
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
      queryKey: [
        "host",
        "file",
        "read",
        "permissions",
        client?.baseUrl ?? "",
        path ?? "",
      ],
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
      onSuccess: (_, { client, query: { path } }) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              "host",
              "file",
              "read",
              "permissions",
              client.baseUrl,
              path,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
