import { xnode } from '@openmesh-network/xnode-manager-sdk';
import { useQuery as useQuery$1, useMutation as useMutation$1, useQueryClient } from '@tanstack/react-query';

function useQuery(options, overrides) {
    return useQuery$1({
        ...options,
        ...overrides,
        enabled: options.enabled !== false && overrides?.enabled !== false,
    });
}
function useMutation(options, overrides) {
    return useMutation$1({
        ...options,
        ...overrides,
        onSuccess(data, variables, context) {
            overrides?.onSuccess?.(data, variables, context);
            options?.onSuccess?.(data, variables, context);
        },
    });
}

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    useMutation: useMutation,
    useQuery: useQuery
});

function useContainerConfigGet({ client, container, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "container", container, "config", "get"],
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
    }, overrides);
}
function useContainerConfigSet(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.config.set,
        onSuccess: (_data, { client, path: { container } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container, "config", "get"],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerConfigVersion({ client, container, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "container", container, "config", "version"],
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
    }, overrides);
}
function useContainerConfigUpdate(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.config.update,
        onSuccess: (_data, { client, path: { container } }) => {
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
    }, input?.overrides);
}
function useContainerConfigBuild(input = {}) {
    return useMutation({
        mutationFn: xnode.container.config.build,
    }, input?.overrides);
}
function useContainerConfigApply(input = {}) {
    return useMutation({
        mutationFn: xnode.container.config.apply,
    }, input?.overrides);
}

function useContainerFileMetadata({ client, container, path, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "file",
            path,
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
    }, overrides);
}
function useContainerFileSize({ client, container, path, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "container", container, "file", path, "size"],
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
    }, overrides);
}
function useContainerFileMove(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.move,
        onSuccess: (_data, { client, path: { container }, data: { source, destination } }) => {
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
    }, input?.overrides);
}
function useContainerFileRemove(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.remove,
        onSuccess: (_data, { client, path: { container }, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container, "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerFileCopy(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.copy,
        onSuccess: (_data, { client, path: { container }, data: { destination } }) => {
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
    }, input?.overrides);
}
function useContainerFileReadFile({ client, container, path, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "file",
            path,
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
    }, overrides);
}
function useContainerFileWriteFile(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.write_file,
        onSuccess: (_data, { client, path: { container }, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container, "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerFileReadFolder({ client, container, path, metadata, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "file",
            path,
            "folder",
            "read",
            { metadata },
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
    }, overrides);
}
function useContainerFileCreateFolder(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.create_folder,
        onSuccess: (_data, { client, path: { container }, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container, "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerFileReadLink({ client, container, path, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "file",
            path,
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
    }, overrides);
}
function useContainerWriteLink(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.write_link,
        onSuccess: (_data, { client, path: { container }, data: { destination } }) => {
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
    }, input?.overrides);
}
function useContainerFileGetPermissions({ client, container, path, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "file",
            path,
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
    }, overrides);
}
function useContainerFileSetPermissions(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.file.set_permissions,
        onSuccess: (_data, { client, path: { container }, query: { path } }) => {
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
    }, input?.overrides);
}

function useContainerInfoFlakeMetadata({ client, container, flake, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerInfoEval({ client, container, statement, config, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerInfoUsersUsers({ client, container, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerInfoUsersGroups({ client, container, overrides, }) {
    return useQuery({
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
    }, overrides);
}

function useContainerProcess({ client, container, status, usage, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "process",
            { status, usage },
        ],
        enabled: !!client && !!container && !!process,
        refetchInterval: usage || status ? 1_000 : 10_000, // 1 or 10 seconds
        queryFn: async () => {
            if (!client || !container || !process) {
                return undefined;
            }
            return await xnode.container.process.process({
                client,
                path: { container },
                query: { status: status ?? null, usage: usage ?? null },
            });
        },
    }, overrides);
}
function useContainerProcessInfo({ client, container, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "container",
            container ?? "",
            "process",
            process ?? "",
            "info",
        ],
        enabled: !!client && !!container && !!process,
        refetchInterval: 60_000, // 60 seconds
        queryFn: async () => {
            if (!client || !container || !process) {
                return undefined;
            }
            return await xnode.container.process.info({
                client,
                path: { container, process },
            });
        },
    }, overrides);
}
function useContainerProcessStatus({ client, container, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "container",
            container ?? "",
            "process",
            process ?? "",
            "status",
        ],
        enabled: !!client && !!container && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !container || !process) {
                return undefined;
            }
            return await xnode.container.process.status({
                client,
                path: { container, process },
            });
        },
    }, overrides);
}
function useContainerProcessLogs({ client, container, process, level, max, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "container",
            container,
            "process",
            process,
            "logs",
            { level, max },
        ],
        enabled: !!client && !!container && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async ({ client: queryClient }) => {
            if (!client || !container || !process) {
                return undefined;
            }
            const previous = queryClient.getQueryData([
                client.baseUrl,
                "container",
                container,
                "process",
                process,
                "logs",
                { level, max },
            ]) ?? [];
            // All logs before this timestamp we've already received
            const lastTimestamp = previous.length > 1
                ? previous[previous.length - 1]?.timestamp
                : undefined;
            // We only retain the logs from before this log, this log and everything after will be resent
            const firstLogOfTimestamp = lastTimestamp !== undefined
                ? previous.findIndex((log) => log.timestamp === lastTimestamp)
                : 0;
            const next = await xnode.container.process.logs({
                client,
                path: { container, process },
                query: {
                    after: lastTimestamp ?? null,
                    level: level ?? null,
                    max: max ?? null,
                },
            });
            return [...previous.slice(0, firstLogOfTimestamp), ...next].slice(max ? -max : undefined);
        },
    }, overrides);
}
function useContainerProcessUsage({ client, container, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "container",
            container ?? "",
            "process",
            process ?? "",
            "usage",
        ],
        enabled: !!client && !!container && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !container || !process) {
                return undefined;
            }
            return await xnode.container.process.usage({
                client,
                path: { container, process },
            });
        },
    }, overrides);
}
function useContainerProcessStart(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.process.start,
        onSuccess: (_data, { client, path: { container, process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "container",
                        container,
                        "process",
                        process,
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessStop(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.process.stop,
        onSuccess: (_data, { client, path: { container, process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "container",
                        container,
                        "process",
                        process,
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessRestart(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.process.restart,
        onSuccess: (_data, { client, path: { container, process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "container",
                        container,
                        "process",
                        process,
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessReload(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.process.reload,
        onSuccess: (_data, { client, path: { container, process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "container",
                        container,
                        "process",
                        process,
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}

function useContainer({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "container"],
        enabled: !!client,
        refetchInterval: 10_000, // 10 seconds
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.container.container({
                client,
            });
        },
    }, overrides);
}
function useContainerCreate(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.create,
        onSuccess: (_data, { client }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "list", "container"],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerRemove(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.container.remove,
        onSuccess: (_data, { client, path: { container } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container],
                }),
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "list", "container"],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostConfigGet({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "config", "get"],
        enabled: !!client,
        refetchInterval: 60_000, // 1 minute
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.config.get({
                client,
            });
        },
    }, overrides);
}
function useHostConfigSet(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.config.set,
        onSuccess: (_data, { client }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "config", "get"],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostConfigVersion({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "config", "version"],
        enabled: !!client,
        refetchInterval: 60_000, // 1 minute
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.config.version({
                client,
            });
        },
    }, overrides);
}
function useHostConfigUpdate(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.config.update,
        onSuccess: (_data, { client }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "config", "version"],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostConfigBuild(input = {}) {
    return useMutation({
        mutationFn: xnode.host.config.build,
    }, input?.overrides);
}
function useHostConfigApply(input = {}) {
    return useMutation({
        mutationFn: xnode.host.config.apply,
    }, input?.overrides);
}

function useHostFileMetadata({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileSize({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileMove(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
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
    }, input?.overrides);
}
function useHostFileRemove(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.file.remove,
        onSuccess: (_data, { client, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileCopy(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.file.copy,
        onSuccess: (_data, { client, data: { destination } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", destination],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadFile({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileWriteFile(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.file.write_file,
        onSuccess: (_data, { client, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadFolder({ client, path, metadata, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileCreateFolder(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.file.create_folder,
        onSuccess: (_data, { client, query: { path } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadLink({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileWriteLink(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.file.write_link,
        onSuccess: (_data, { client, data: { destination } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", destination],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileGetPermissions({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileSetPermissions(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
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
    }, input?.overrides);
}

function useHostInfoFlakeMetadata({ client, flake, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostInfoEval({ client, statement, config, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostInfoUsersUsers({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostInfoUsersGroups({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}

function useHostPermissionContainerGet({ client, container, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "permission",
            "container",
            container,
            "get",
        ],
        enabled: !!client && !!container,
        refetchInterval: 60_000, // 1 minute
        queryFn: async () => {
            if (!client || !container) {
                return undefined;
            }
            return await xnode.host.permission.container.get({
                client,
                path: { container },
            });
        },
    }, overrides);
}
function useHostPermissionContainerSet(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.permission.container.set,
        onSuccess: (_data, { client, path: { container } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "host",
                        "permission",
                        "container",
                        container,
                        "get",
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostPermissionVirtualMachineGet({ client, virtual_machine, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "permission",
            "virtual_machine",
            virtual_machine,
            "get",
        ],
        enabled: !!client && !!virtual_machine,
        refetchInterval: 60_000, // 1 minute
        queryFn: async () => {
            if (!client || !virtual_machine) {
                return undefined;
            }
            return await xnode.host.permission.virtual_machine.get({
                client,
                path: { virtual_machine },
            });
        },
    }, overrides);
}
function useHostPermissionVirtualMachineSet(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.permission.virtual_machine.set,
        onSuccess: (_data, { client, path: { virtual_machine } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        client.baseUrl,
                        "host",
                        "permission",
                        "virtual_machine",
                        virtual_machine,
                        "get",
                    ],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostPowerOff(input = {}) {
    return useMutation({
        mutationFn: xnode.host.power.off,
    }, input?.overrides);
}
function useHostPowerReboot(input = {}) {
    return useMutation({
        mutationFn: xnode.host.power.reboot,
    }, input?.overrides);
}

function useHostProcess({ client, status, usage, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "process", { status, usage }],
        enabled: !!client && !!process,
        refetchInterval: usage || status ? 1_000 : 10_000, // 1 or 10 seconds
        queryFn: async () => {
            if (!client || !process) {
                return undefined;
            }
            return await xnode.host.process.process({
                client,
                query: { status: status ?? null, usage: usage ?? null },
            });
        },
    }, overrides);
}
function useHostProcessInfo({ client, process, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "process", process, "info"],
        enabled: !!client && !!process,
        refetchInterval: 60_000, // 60 second
        queryFn: async () => {
            if (!client || !process) {
                return undefined;
            }
            return await xnode.host.process.info({
                client,
                path: { process },
            });
        },
    }, overrides);
}
function useHostProcessStatus({ client, process, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "process", process, "status"],
        enabled: !!client && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !process) {
                return undefined;
            }
            return await xnode.host.process.status({
                client,
                path: { process },
            });
        },
    }, overrides);
}
function useHostProcessLogs({ client, process, level, max, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "process",
            process,
            "logs",
            { level, max },
        ],
        enabled: !!client && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async ({ client: queryClient }) => {
            if (!client || !process) {
                return undefined;
            }
            const previous = queryClient.getQueryData([
                client.baseUrl,
                "host",
                "process",
                process,
                "logs",
                { level, max },
            ]) ?? [];
            // All logs before this timestamp we've already received
            const lastTimestamp = previous.length > 1
                ? previous[previous.length - 1]?.timestamp
                : undefined;
            // We only retain the logs from before this log, this log and everything after will be resent
            const firstLogOfTimestamp = lastTimestamp !== undefined
                ? previous.findIndex((log) => log.timestamp === lastTimestamp)
                : 0;
            const next = await xnode.host.process.logs({
                client,
                path: { process },
                query: {
                    after: lastTimestamp ?? null,
                    level: level ?? null,
                    max: max ?? null,
                },
            });
            return [...previous.slice(0, firstLogOfTimestamp), ...next].slice(max ? -max : undefined);
        },
    }, overrides);
}
function useHostProcessUsage({ client, process, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "process", process, "usage"],
        enabled: !!client && !!process,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !process) {
                return undefined;
            }
            return await xnode.host.process.usage({
                client,
                path: { process },
            });
        },
    }, overrides);
}
function useHostProcessStart(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.process.start,
        onSuccess: (_data, { client, path: { process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessStop(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.process.stop,
        onSuccess: (_data, { client, path: { process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessRestart(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.process.restart,
        onSuccess: (_data, { client, path: { process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessReload(input = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: xnode.host.process.reload,
        onSuccess: (_data, { client, path: { process } }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostHardwareCpu({ client, usage, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "cpu", { usage }],
        enabled: !!client,
        refetchInterval: usage ? 1_000 : false, // 1 second or never
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.hardware.cpu.cpu({
                client,
                query: { usage: usage ?? null },
            });
        },
    }, overrides);
}
function useHostHardwareCpuInfo({ client, cpu, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "cpu", cpu, "info"],
        enabled: !!client && !!cpu,
        queryFn: async () => {
            if (!client || !cpu) {
                return undefined;
            }
            return await xnode.host.hardware.cpu.info({
                client,
                path: { cpu },
            });
        },
    }, overrides);
}
function useHostHardwareCpuUsage({ client, cpu, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "cpu", cpu, "usage"],
        enabled: !!client && !!cpu,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !cpu) {
                return undefined;
            }
            return await xnode.host.hardware.cpu.usage({
                client,
                path: { cpu },
            });
        },
    }, overrides);
}

function useHostHardwareDisk({ client, usage, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "disk", { usage }],
        enabled: !!client,
        refetchInterval: usage ? 1_000 : false, // 1 second or never
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.hardware.disk.disk({
                client,
                query: { usage: usage ?? null },
            });
        },
    }, overrides);
}
function useHostHardwareDiskUsage({ client, disk, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "disk", disk, "usage"],
        enabled: !!client && !!disk,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !disk) {
                return undefined;
            }
            return await xnode.host.hardware.disk.usage({
                client,
                path: { disk },
            });
        },
    }, overrides);
}

function useHostHardwareGpuNvidia({ client, usage, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "hardware",
            "gpu",
            "nvidia",
            { usage },
        ],
        enabled: !!client,
        refetchInterval: usage ? 1_000 : false, // 1 second or never
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.hardware.gpu.nvidia.nvidia({
                client,
                query: { usage: usage ?? null },
            });
        },
    }, overrides);
}
function useHostHardwareGpuNvidiaInfo({ client, gpu, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "gpu", gpu, "info"],
        enabled: !!client && !!gpu,
        queryFn: async () => {
            if (!client || !gpu) {
                return undefined;
            }
            return await xnode.host.hardware.gpu.nvidia.info({
                client,
                path: { gpu },
            });
        },
    }, overrides);
}
function useHostHardwaregpuUsage({ client, gpu, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "gpu", gpu, "usage"],
        enabled: !!client && !!gpu,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !gpu) {
                return undefined;
            }
            return await xnode.host.hardware.gpu.nvidia.usage({
                client,
                path: { gpu },
            });
        },
    }, overrides);
}

function useHostHardwareMemoryUsage({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "memory", "usage"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.hardware.memory.usage({
                client,
            });
        },
    }, overrides);
}

function useHostHardwareNetwork({ client, usage, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl, "host", "hardware", "network", { usage }],
        enabled: !!client,
        refetchInterval: usage ? 1_000 : false, // 1 second or never
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.hardware.network.network({
                client,
                query: { usage: usage ?? null },
            });
        },
    }, overrides);
}
function useHostHardwareNetworkInfo({ client, network, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "hardware",
            "network",
            network,
            "info",
        ],
        enabled: !!client && !!network,
        refetchInterval: 10_000, // 10 seconds
        queryFn: async () => {
            if (!client || !network) {
                return undefined;
            }
            return await xnode.host.hardware.network.info({
                client,
                path: { network },
            });
        },
    }, overrides);
}
function useHostHardwareNetworkUsage({ client, network, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl,
            "host",
            "hardware",
            "network",
            network,
            "usage",
        ],
        enabled: !!client && !!network,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client || !network) {
                return undefined;
            }
            return await xnode.host.hardware.network.usage({
                client,
                path: { network },
            });
        },
    }, overrides);
}

export { useContainer, useContainerConfigApply, useContainerConfigBuild, useContainerConfigGet, useContainerConfigSet, useContainerConfigUpdate, useContainerConfigVersion, useContainerCreate, useContainerFileCopy, useContainerFileCreateFolder, useContainerFileGetPermissions, useContainerFileMetadata, useContainerFileMove, useContainerFileReadFile, useContainerFileReadFolder, useContainerFileReadLink, useContainerFileRemove, useContainerFileSetPermissions, useContainerFileSize, useContainerFileWriteFile, useContainerInfoEval, useContainerInfoFlakeMetadata, useContainerInfoUsersGroups, useContainerInfoUsersUsers, useContainerProcess, useContainerProcessInfo, useContainerProcessLogs, useContainerProcessReload, useContainerProcessRestart, useContainerProcessStart, useContainerProcessStatus, useContainerProcessStop, useContainerProcessUsage, useContainerRemove, useContainerWriteLink, useHostConfigApply, useHostConfigBuild, useHostConfigGet, useHostConfigSet, useHostConfigUpdate, useHostConfigVersion, useHostFileCopy, useHostFileCreateFolder, useHostFileGetPermissions, useHostFileMetadata, useHostFileMove, useHostFileReadFile, useHostFileReadFolder, useHostFileReadLink, useHostFileRemove, useHostFileSetPermissions, useHostFileSize, useHostFileWriteFile, useHostFileWriteLink, useHostHardwareCpu, useHostHardwareCpuInfo, useHostHardwareCpuUsage, useHostHardwareDisk, useHostHardwareDiskUsage, useHostHardwareGpuNvidia, useHostHardwareGpuNvidiaInfo, useHostHardwareMemoryUsage, useHostHardwareNetwork, useHostHardwareNetworkInfo, useHostHardwareNetworkUsage, useHostHardwaregpuUsage, useHostInfoEval, useHostInfoFlakeMetadata, useHostInfoUsersGroups, useHostInfoUsersUsers, useHostPermissionContainerGet, useHostPermissionContainerSet, useHostPermissionVirtualMachineGet, useHostPermissionVirtualMachineSet, useHostPowerOff, useHostPowerReboot, useHostProcess, useHostProcessInfo, useHostProcessLogs, useHostProcessReload, useHostProcessRestart, useHostProcessStart, useHostProcessStatus, useHostProcessStop, useHostProcessUsage, utils };
