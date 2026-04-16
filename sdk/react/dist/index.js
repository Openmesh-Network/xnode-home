import { xnode } from '@openmesh-network/xnode-manager-sdk';
import { useQuery as useQuery$1, useMutation as useMutation$1 } from '@tanstack/react-query';

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
        onSuccess(data, variables, onMutateResult, context) {
            overrides?.onSuccess?.(data, variables, onMutateResult, context);
            options?.onSuccess?.(data, variables, onMutateResult, context);
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
    }, overrides);
}
function useContainerConfigSet(input = {}) {
    return useMutation({
        mutationFn: xnode.container.config.set,
        onSuccess: (_data, { client, path: { container } }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useContainerConfigUpdate(input = {}) {
    return useMutation({
        mutationFn: xnode.container.config.update,
        onSuccess: (_data, { client, path: { container } }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useContainerFileSize({ client, container, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerFileMove(input = {}) {
    return useMutation({
        mutationFn: xnode.container.file.move,
        onSuccess: (_data, { client, path: { container }, data: { source, destination } }, _onMutateResult, { client: queryClient }) => {
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
    return useMutation({
        mutationFn: xnode.container.file.remove,
        onSuccess: (_data, { client, path: { container }, query: { path } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container, "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerFileCopy(input = {}) {
    return useMutation({
        mutationFn: xnode.container.file.copy,
        onSuccess: (_data, { client, path: { container }, data: { destination } }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useContainerFileWriteFile(input = {}) {
    return useMutation({
        mutationFn: xnode.container.file.write_file,
        onSuccess: (_data, { client, path: { container }, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useContainerFileCreateFolder(input = {}) {
    return useMutation({
        mutationFn: xnode.container.file.create_folder,
        onSuccess: (_data, { client, path: { container }, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useContainerFileGetPermissions({ client, container, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerFileSetPermissions(input = {}) {
    return useMutation({
        mutationFn: xnode.container.file.set_permissions,
        onSuccess: (_data, { client, path: { container }, query: { path } }, _onMutateResult, { client: queryClient }) => {
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

function useContainerInfoUsersUsers({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useContainerInfoUsersGroups({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}

function useContainerListProcess({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "list", "process"],
        enabled: !!client,
        refetchInterval: 10_000, // 10 seconds
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.list.process({
                client,
            });
        },
    }, overrides);
}

function useContainerProcessLogs({ client, process, level, max, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "logs",
            level ?? "",
            max ?? 0,
        ],
        enabled: !!client && !!process,
        refetchInterval: 1000,
        queryFn: async ({ client: queryClient }) => {
            if (!client || !process)
                return [];
            const previous = queryClient.getQueryData([
                "host",
                "process",
                "logs",
                client.baseUrl,
                process,
                level ?? "",
                max ?? 0,
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
function useContainerProcessStatus({ client, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "status",
        ],
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
function useContainerProcessUsage({ client, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "usage",
        ],
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
function useContainerProcessStart(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.start,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessStop(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.stop,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessRestart(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.restart,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useContainerProcessReload(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.reload,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}

function useContainerRemove(input = {}) {
    return useMutation({
        mutationFn: xnode.container.remove,
        onSuccess: (_data, { client, path: { container } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "container", container],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostConfigGet({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostConfigSet(input = {}) {
    return useMutation({
        mutationFn: xnode.host.config.set,
        onSuccess: (_data, { client }, _onMutateResult, { client: queryClient }) => {
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
    }, overrides);
}
function useHostConfigUpdate(input = {}) {
    return useMutation({
        mutationFn: xnode.host.config.update,
        onSuccess: (_data, { client }, _onMutateResult, { client: queryClient }) => {
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
        queryKey: [client?.baseUrl ?? "", "host", "file", path ?? "", "metadata"],
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
        queryKey: [client?.baseUrl ?? "", "host", "file", path ?? "", "size"],
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
    return useMutation({
        mutationFn: xnode.host.file.move,
        onSuccess: (_data, { client, data: { source, destination } }, _onMutateResult, { client: queryClient }) => {
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
    return useMutation({
        mutationFn: xnode.host.file.remove,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "file", path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileCopy(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.copy,
        onSuccess: (_data, { client, data: { destination } }, _onMutateResult, { client: queryClient }) => {
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
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "file",
            path ?? "",
            "file",
            "read",
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
    }, overrides);
}
function useHostFileWriteFile(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.write_file,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
            client?.baseUrl ?? "",
            "host",
            "file",
            path ?? "",
            "folder",
            "read",
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
    }, overrides);
}
function useHostFileCreateFolder(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.create_folder,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "file",
            path ?? "",
            "link",
            "read",
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
    }, overrides);
}
function useHostFileGetPermissions({ client, path, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "file",
            path ?? "",
            "permissions",
            "read",
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
    }, overrides);
}
function useHostFileSetPermissions(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.set_permissions,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "info",
            "flake",
            flake ?? "",
            "metadata",
        ],
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
function useHostInfoEval({ client, statement, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "info",
            "eval",
            statement ?? "",
        ],
        enabled: !!client && !!statement,
        refetchInterval: 60_000, // 1 minute
        queryFn: async () => {
            if (!client || !statement) {
                return undefined;
            }
            return await xnode.host.info.eval({
                client,
                query: { statement },
            });
        },
    }, overrides);
}
function useHostInfoUsersUsers({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostInfoUsersGroups({ client, overrides, }) {
    return useQuery({
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
    }, overrides);
}

function useHostListProcess({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "list", "process"],
        enabled: !!client,
        refetchInterval: 10_000, // 10 seconds
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.list.process({
                client,
            });
        },
    }, overrides);
}
function useHostListContainer({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "list", "container"],
        enabled: !!client,
        refetchInterval: 10_000, // 10 seconds
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.list.container({
                client,
            });
        },
    }, overrides);
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

function useHostProcessLogs({ client, process, level, max, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "logs",
            level ?? "",
            max ?? 0,
        ],
        enabled: !!client && !!process,
        refetchInterval: 1000,
        queryFn: async ({ client: queryClient }) => {
            if (!client || !process)
                return [];
            const previous = queryClient.getQueryData([
                "host",
                "process",
                "logs",
                client.baseUrl,
                process,
                level ?? "",
                max ?? 0,
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
function useHostProcessStatus({ client, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "status",
        ],
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
function useHostProcessUsage({ client, process, overrides, }) {
    return useQuery({
        queryKey: [
            client?.baseUrl ?? "",
            "host",
            "process",
            process ?? "",
            "usage",
        ],
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
    return useMutation({
        mutationFn: xnode.host.process.start,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessStop(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.stop,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessRestart(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.restart,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostProcessReload(input = {}) {
    return useMutation({
        mutationFn: xnode.host.process.reload,
        onSuccess: (_data, { client, path: { process } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [client.baseUrl, "host", "process", process],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostUsageCpu({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "usage", "cpu"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.usage.cpu({
                client,
            });
        },
    }, overrides);
}
function useHostUsageMemory({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "usage", "memory"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.usage.memory({
                client,
            });
        },
    }, overrides);
}
function useHostUsageDisk({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "usage", "disk"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.usage.disk({
                client,
            });
        },
    }, overrides);
}
function useHostUsageNetwork({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "usage", "network"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.usage.network({
                client,
            });
        },
    }, overrides);
}
function useHostUsageGpu({ client, overrides, }) {
    return useQuery({
        queryKey: [client?.baseUrl ?? "", "host", "usage", "gpu"],
        enabled: !!client,
        refetchInterval: 1_000, // 1 second
        queryFn: async () => {
            if (!client) {
                return undefined;
            }
            return await xnode.host.usage.gpu({
                client,
            });
        },
    }, overrides);
}

export { useContainerConfigApply, useContainerConfigBuild, useContainerConfigGet, useContainerConfigSet, useContainerConfigUpdate, useContainerConfigVersion, useContainerFileCopy, useContainerFileCreateFolder, useContainerFileGetPermissions, useContainerFileMetadata, useContainerFileMove, useContainerFileReadFile, useContainerFileReadFolder, useContainerFileReadLink, useContainerFileRemove, useContainerFileSetPermissions, useContainerFileSize, useContainerFileWriteFile, useContainerInfoUsersGroups, useContainerInfoUsersUsers, useContainerListProcess, useContainerProcessLogs, useContainerProcessReload, useContainerProcessRestart, useContainerProcessStart, useContainerProcessStatus, useContainerProcessStop, useContainerProcessUsage, useContainerRemove, useHostConfigApply, useHostConfigBuild, useHostConfigGet, useHostConfigSet, useHostConfigUpdate, useHostConfigVersion, useHostFileCopy, useHostFileCreateFolder, useHostFileGetPermissions, useHostFileMetadata, useHostFileMove, useHostFileReadFile, useHostFileReadFolder, useHostFileReadLink, useHostFileRemove, useHostFileSetPermissions, useHostFileSize, useHostFileWriteFile, useHostInfoEval, useHostInfoFlakeMetadata, useHostInfoUsersGroups, useHostInfoUsersUsers, useHostListContainer, useHostListProcess, useHostPowerOff, useHostPowerReboot, useHostProcessLogs, useHostProcessReload, useHostProcessRestart, useHostProcessStart, useHostProcessStatus, useHostProcessStop, useHostProcessUsage, useHostUsageCpu, useHostUsageDisk, useHostUsageGpu, useHostUsageMemory, useHostUsageNetwork, utils };
