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
async function awaitCommand({ client, command, pollInterval, }) {
    let status;
    while (!status || status.running) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
        status = await xnode.host.process
            .status({ client, path: { process: command.id } })
            .catch(() => undefined);
    }
}

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    awaitCommand: awaitCommand,
    useMutation: useMutation,
    useQuery: useQuery
});

function useHostConfigGet({ client, overrides, }) {
    return useQuery({
        queryKey: ["host", "config", "get", client?.baseUrl ?? ""],
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
                    queryKey: ["host", "config", "get", client.baseUrl],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostConfigVersion({ client, overrides, }) {
    return useQuery({
        queryKey: ["host", "config", "version", client?.baseUrl ?? ""],
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
                    queryKey: ["host", "config", "version", client.baseUrl],
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
    }, overrides);
}
function useHostFileSize({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileMove(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.move,
        onSuccess: (_data, { client, data: { source, destination } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["host", "file", client.baseUrl, source],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["host", "file", client.baseUrl, destination],
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
                    queryKey: ["host", "file", client.baseUrl, path],
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
                    queryKey: ["host", "file", client.baseUrl, destination],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadFile({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileWriteFile(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.write_file,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["host", "file", client.baseUrl, path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadFolder({ client, path, metadata, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileCreateFolder(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.create_folder,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["host", "file", client.baseUrl, path],
                }),
            ]);
        },
    }, input?.overrides);
}
function useHostFileReadLink({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileGetPermissions({ client, path, overrides, }) {
    return useQuery({
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
    }, overrides);
}
function useHostFileSetPermissions(input = {}) {
    return useMutation({
        mutationFn: xnode.host.file.set_permissions,
        onSuccess: (_data, { client, query: { path } }, _onMutateResult, { client: queryClient }) => {
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
    }, input?.overrides);
}

function useHostInfoFlakeMetadata({ client, flake, overrides, }) {
    return useQuery({
        queryKey: [
            "host",
            "info",
            "flake",
            "metadata",
            client?.baseUrl ?? "",
            flake ?? "",
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
            "host",
            "info",
            "eval",
            client?.baseUrl ?? "",
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
        queryKey: ["host", "info", "users", "users", client?.baseUrl ?? ""],
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
        queryKey: ["host", "info", "users", "groups", client?.baseUrl ?? ""],
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
        queryKey: ["host", "list", "process", client?.baseUrl ?? ""],
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
        queryKey: ["host", "list", "container", client?.baseUrl ?? ""],
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
            "host",
            "process",
            "logs",
            client?.baseUrl ?? "",
            process ?? "",
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
            "host",
            "process",
            "status",
            client?.baseUrl ?? "",
            process ?? "",
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
            "host",
            "process",
            "usage",
            client?.baseUrl ?? "",
            process ?? "",
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
                    queryKey: ["host", "process", client.baseUrl, process],
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
                    queryKey: ["host", "process", client.baseUrl, process],
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
                    queryKey: ["host", "process", client.baseUrl, process],
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
                    queryKey: ["host", "process", client.baseUrl, process],
                }),
            ]);
        },
    }, input?.overrides);
}

function useHostUsageCpu({ client, overrides, }) {
    return useQuery({
        queryKey: ["host", "usage", "cpu", client?.baseUrl ?? ""],
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
        queryKey: ["host", "usage", "memory", client?.baseUrl ?? ""],
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
        queryKey: ["host", "usage", "disk", client?.baseUrl ?? ""],
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
        queryKey: ["host", "usage", "network", client?.baseUrl ?? ""],
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
        queryKey: ["host", "usage", "gpu", client?.baseUrl ?? ""],
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

export { useHostConfigApply, useHostConfigBuild, useHostConfigGet, useHostConfigSet, useHostConfigUpdate, useHostConfigVersion, useHostFileCopy, useHostFileCreateFolder, useHostFileGetPermissions, useHostFileMetadata, useHostFileMove, useHostFileReadFile, useHostFileReadFolder, useHostFileReadLink, useHostFileRemove, useHostFileSetPermissions, useHostFileSize, useHostFileWriteFile, useHostInfoEval, useHostInfoFlakeMetadata, useHostInfoUsersGroups, useHostInfoUsersUsers, useHostListContainer, useHostListProcess, useHostPowerOff, useHostPowerReboot, useHostProcessLogs, useHostProcessReload, useHostProcessRestart, useHostProcessStart, useHostProcessStatus, useHostProcessStop, useHostProcessUsage, useHostUsageCpu, useHostUsageDisk, useHostUsageGpu, useHostUsageMemory, useHostUsageNetwork, utils };
