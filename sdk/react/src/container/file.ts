import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "../utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useContainerFileMetadata({
  client,
  container,
  path,
  overrides,
}: UseQueryInput<
  xnode.container.file.metadata_input,
  xnode.container.file.metadata_output
>): UseQueryOutput<xnode.container.file.metadata_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "metadata",
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.metadata({
          client,
          path: { container },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useContainerFileSize({
  client,
  container,
  path,
  overrides,
}: UseQueryInput<
  xnode.container.file.size_input,
  xnode.container.file.size_output
>): UseQueryOutput<xnode.container.file.size_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "size",
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.size({
          client,
          path: { container },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useContainerFileMove(
  input: UseMutationInput<
    xnode.container.file.move_input,
    xnode.container.file.move_output
  > = {}
): UseMutationOutput<
  xnode.container.file.move_input,
  xnode.container.file.move_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.move,
      onSuccess: (
        _data,
        { client, path: { container }, data: { source, destination } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container, "file", source],
          }),
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "file",
              destination,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerFileRemove(
  input: UseMutationInput<
    xnode.container.file.remove_input,
    xnode.container.file.remove_output
  > = {}
): UseMutationOutput<
  xnode.container.file.remove_input,
  xnode.container.file.remove_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.remove,
      onSuccess: (
        _data,
        { client, path: { container }, query: { path } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container, "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerFileCopy(
  input: UseMutationInput<
    xnode.container.file.copy_input,
    xnode.container.file.copy_output
  > = {}
): UseMutationOutput<
  xnode.container.file.copy_input,
  xnode.container.file.copy_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.copy,
      onSuccess: (
        _data,
        { client, path: { container }, data: { destination } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
              "file",
              destination,
            ],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerFileReadFile({
  client,
  container,
  path,
  overrides,
}: UseQueryInput<
  xnode.container.file.read_file_input,
  xnode.container.file.read_file_output
>): UseQueryOutput<xnode.container.file.read_file_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "file",
        "read",
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.read_file({
          client,
          path: { container },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useContainerFileWriteFile(
  input: UseMutationInput<
    xnode.container.file.write_file_input,
    xnode.container.file.write_file_output
  > = {}
): UseMutationOutput<
  xnode.container.file.write_file_input,
  xnode.container.file.write_file_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.write_file,
      onSuccess: (
        _data,
        { client, path: { container }, query: { path } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container, "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerFileReadFolder({
  client,
  container,
  path,
  metadata,
  overrides,
}: UseQueryInput<
  xnode.container.file.read_folder_input,
  xnode.container.file.read_folder_output
>): UseQueryOutput<xnode.container.file.read_folder_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "folder",
        "read",
        metadata ?? false,
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.read_folder({
          client,
          path: { container },
          query: { path, metadata: metadata ?? null },
        });
      },
    },
    overrides
  );
}

export function useContainerFileCreateFolder(
  input: UseMutationInput<
    xnode.container.file.create_folder_input,
    xnode.container.file.create_folder_output
  > = {}
): UseMutationOutput<
  xnode.container.file.create_folder_input,
  xnode.container.file.create_folder_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.create_folder,
      onSuccess: (
        _data,
        { client, path: { container }, query: { path } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container, "file", path],
          }),
        ]);
      },
    },
    input?.overrides
  );
}

export function useContainerFileReadLink({
  client,
  container,
  path,
  overrides,
}: UseQueryInput<
  xnode.container.file.read_link_input,
  xnode.container.file.read_link_output
>): UseQueryOutput<xnode.container.file.read_link_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "link",
        "read",
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.read_link({
          client,
          path: { container },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useContainerFileGetPermissions({
  client,
  container,
  path,
  overrides,
}: UseQueryInput<
  xnode.container.file.get_permissions_input,
  xnode.container.file.get_permissions_output
>): UseQueryOutput<xnode.container.file.get_permissions_output> {
  return useQuery(
    {
      queryKey: [
        client?.baseUrl ?? "",
        "container",
        container ?? "",
        "file",
        path ?? "",
        "permissions",
        "read",
      ],
      enabled: !!client && !!container && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!client || !container || !path) {
          return undefined;
        }

        return await xnode.container.file.get_permissions({
          client,
          path: { container },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useContainerFileSetPermissions(
  input: UseMutationInput<
    xnode.container.file.set_permissions_input,
    xnode.container.file.set_permissions_output
  > = {}
): UseMutationOutput<
  xnode.container.file.set_permissions_input,
  xnode.container.file.set_permissions_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.file.set_permissions,
      onSuccess: (
        _data,
        { client, path: { container }, query: { path } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              client.baseUrl,
              "container",
              container,
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
