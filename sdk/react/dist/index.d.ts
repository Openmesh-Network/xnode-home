import { xnode } from '@openmesh-network/xnode-manager-sdk';
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

type QueryOverrides<Output> = Partial<UseQueryOptions<Output | undefined>>;
type UseQueryInput<Input extends {
    client: xnode.common.utils.client.Client;
    path?: Path;
    query?: Query;
}, Output, Path = {}, Query = {}> = Partial<Input["path"]> & Partial<Input["query"]> & {
    client?: xnode.common.utils.client.Client;
    overrides?: QueryOverrides<Output>;
};
type UseQueryOutput<Data> = UseQueryResult<NoInfer<Data | undefined>, Error>;
declare function useQuery<Output>(options: UseQueryOptions<Output | undefined>, overrides: QueryOverrides<Output> | undefined): UseQueryOutput<Output>;
type MutationOverrides<Input, Output> = UseMutationOptions<Output, Error, Input>;
type UseMutationInput<Input, Output> = {
    overrides?: MutationOverrides<Input, Output>;
};
type UseMutationOutput<Input, Output> = UseMutationResult<Output, Error, Input>;
declare function useMutation<Input, Output>(options: UseMutationOptions<Output, Error, Input>, overrides: MutationOverrides<Input, Output> | undefined): UseMutationOutput<Input, Output>;

type utils_d_MutationOverrides<Input, Output> = MutationOverrides<Input, Output>;
type utils_d_QueryOverrides<Output> = QueryOverrides<Output>;
type utils_d_UseMutationInput<Input, Output> = UseMutationInput<Input, Output>;
type utils_d_UseMutationOutput<Input, Output> = UseMutationOutput<Input, Output>;
type utils_d_UseQueryInput<Input extends {
    client: xnode.common.utils.client.Client;
    path?: Path;
    query?: Query;
}, Output, Path = {}, Query = {}> = UseQueryInput<Input, Output, Path, Query>;
type utils_d_UseQueryOutput<Data> = UseQueryOutput<Data>;
declare const utils_d_useMutation: typeof useMutation;
declare const utils_d_useQuery: typeof useQuery;
declare namespace utils_d {
  export { utils_d_useMutation as useMutation, utils_d_useQuery as useQuery };
  export type { utils_d_MutationOverrides as MutationOverrides, utils_d_QueryOverrides as QueryOverrides, utils_d_UseMutationInput as UseMutationInput, utils_d_UseMutationOutput as UseMutationOutput, utils_d_UseQueryInput as UseQueryInput, utils_d_UseQueryOutput as UseQueryOutput };
}

declare function useContainerConfigGet({ client, container, overrides, }: UseQueryInput<xnode.container.config.get_input, xnode.container.config.get_output>): UseQueryOutput<xnode.container.config.get_output>;
declare function useContainerConfigSet(input?: UseMutationInput<xnode.container.config.set_input, xnode.container.config.set_output>): UseMutationOutput<xnode.container.config.set_input, xnode.container.config.set_output>;
declare function useContainerConfigVersion({ client, container, overrides, }: UseQueryInput<xnode.container.config.version_input, xnode.container.config.version_output>): UseQueryOutput<xnode.container.config.version_output>;
declare function useContainerConfigUpdate(input?: UseMutationInput<xnode.container.config.update_input, xnode.container.config.update_output>): UseMutationOutput<xnode.container.config.update_input, xnode.container.config.update_output>;
declare function useContainerConfigBuild(input?: UseMutationInput<xnode.container.config.build_input, xnode.container.config.build_output>): UseMutationOutput<xnode.container.config.build_input, xnode.container.config.build_output>;
declare function useContainerConfigApply(input?: UseMutationInput<xnode.container.config.apply_input, xnode.container.config.apply_output>): UseMutationOutput<xnode.container.config.apply_input, xnode.container.config.apply_output>;

declare function useContainerFileMetadata({ client, container, path, overrides, }: UseQueryInput<xnode.container.file.metadata_input, xnode.container.file.metadata_output>): UseQueryOutput<xnode.container.file.metadata_output>;
declare function useContainerFileSize({ client, container, path, overrides, }: UseQueryInput<xnode.container.file.size_input, xnode.container.file.size_output>): UseQueryOutput<xnode.container.file.size_output>;
declare function useContainerFileMove(input?: UseMutationInput<xnode.container.file.move_input, xnode.container.file.move_output>): UseMutationOutput<xnode.container.file.move_input, xnode.container.file.move_output>;
declare function useContainerFileRemove(input?: UseMutationInput<xnode.container.file.remove_input, xnode.container.file.remove_output>): UseMutationOutput<xnode.container.file.remove_input, xnode.container.file.remove_output>;
declare function useContainerFileCopy(input?: UseMutationInput<xnode.container.file.copy_input, xnode.container.file.copy_output>): UseMutationOutput<xnode.container.file.copy_input, xnode.container.file.copy_output>;
declare function useContainerFileReadFile({ client, container, path, overrides, }: UseQueryInput<xnode.container.file.read_file_input, xnode.container.file.read_file_output>): UseQueryOutput<xnode.container.file.read_file_output>;
declare function useContainerFileWriteFile(input?: UseMutationInput<xnode.container.file.write_file_input, xnode.container.file.write_file_output>): UseMutationOutput<xnode.container.file.write_file_input, xnode.container.file.write_file_output>;
declare function useContainerFileReadFolder({ client, container, path, metadata, overrides, }: UseQueryInput<xnode.container.file.read_folder_input, xnode.container.file.read_folder_output>): UseQueryOutput<xnode.container.file.read_folder_output>;
declare function useContainerFileCreateFolder(input?: UseMutationInput<xnode.container.file.create_folder_input, xnode.container.file.create_folder_output>): UseMutationOutput<xnode.container.file.create_folder_input, xnode.container.file.create_folder_output>;
declare function useContainerFileReadLink({ client, container, path, overrides, }: UseQueryInput<xnode.container.file.read_link_input, xnode.container.file.read_link_output>): UseQueryOutput<xnode.container.file.read_link_output>;
declare function useContainerWriteLink(input?: UseMutationInput<xnode.container.file.write_link_input, xnode.container.file.write_link_output>): UseMutationOutput<xnode.container.file.write_link_input, xnode.container.file.write_link_output>;
declare function useContainerFileGetPermissions({ client, container, path, overrides, }: UseQueryInput<xnode.container.file.get_permissions_input, xnode.container.file.get_permissions_output>): UseQueryOutput<xnode.container.file.get_permissions_output>;
declare function useContainerFileSetPermissions(input?: UseMutationInput<xnode.container.file.set_permissions_input, xnode.container.file.set_permissions_output>): UseMutationOutput<xnode.container.file.set_permissions_input, xnode.container.file.set_permissions_output>;

declare function useContainerInfoUsersUsers({ client, container, overrides, }: UseQueryInput<xnode.container.info.users.users_input, xnode.container.info.users.users_output>): UseQueryOutput<xnode.container.info.users.users_output>;
declare function useContainerInfoUsersGroups({ client, container, overrides, }: UseQueryInput<xnode.container.info.users.groups_input, xnode.container.info.users.groups_output>): UseQueryOutput<xnode.container.info.users.groups_output>;

declare function useContainerListProcess({ client, container, overrides, }: UseQueryInput<xnode.container.list.process_input, xnode.container.list.process_output>): UseQueryOutput<xnode.container.list.process_output>;

declare function useContainerProcessLogs({ client, container, process, level, max, overrides, }: UseQueryInput<xnode.container.process.logs_input, xnode.container.process.logs_output>): UseQueryOutput<xnode.container.process.logs_output>;
declare function useContainerProcessStatus({ client, container, process, overrides, }: UseQueryInput<xnode.container.process.status_input, xnode.container.process.status_output>): UseQueryOutput<xnode.container.process.status_output>;
declare function useContainerProcessUsage({ client, container, process, overrides, }: UseQueryInput<xnode.container.process.usage_input, xnode.container.process.usage_output>): UseQueryOutput<xnode.container.process.usage_output>;
declare function useContainerProcessStart(input?: UseMutationInput<xnode.container.process.start_input, xnode.container.process.start_output>): UseMutationOutput<xnode.container.process.start_input, xnode.container.process.start_output>;
declare function useContainerProcessStop(input?: UseMutationInput<xnode.container.process.stop_input, xnode.container.process.stop_output>): UseMutationOutput<xnode.container.process.stop_input, xnode.container.process.stop_output>;
declare function useContainerProcessRestart(input?: UseMutationInput<xnode.container.process.restart_input, xnode.container.process.restart_output>): UseMutationOutput<xnode.container.process.restart_input, xnode.container.process.restart_output>;
declare function useContainerProcessReload(input?: UseMutationInput<xnode.container.process.reload_input, xnode.container.process.reload_output>): UseMutationOutput<xnode.container.process.reload_input, xnode.container.process.reload_output>;

declare function useContainerCreate(input?: UseMutationInput<xnode.container.create_input, xnode.container.create_output>): UseMutationOutput<xnode.container.create_input, xnode.container.create_output>;
declare function useContainerRemove(input?: UseMutationInput<xnode.container.remove_input, xnode.container.remove_output>): UseMutationOutput<xnode.container.remove_input, xnode.container.remove_output>;

declare function useHostConfigGet({ client, overrides, }: UseQueryInput<xnode.host.config.get_input, xnode.host.config.get_output>): UseQueryOutput<xnode.host.config.get_output>;
declare function useHostConfigSet(input?: UseMutationInput<xnode.host.config.set_input, xnode.host.config.set_output>): UseMutationOutput<xnode.host.config.set_input, xnode.host.config.set_output>;
declare function useHostConfigVersion({ client, overrides, }: UseQueryInput<xnode.host.config.version_input, xnode.host.config.version_output>): UseQueryOutput<xnode.host.config.version_output>;
declare function useHostConfigUpdate(input?: UseMutationInput<xnode.host.config.update_input, xnode.host.config.update_output>): UseMutationOutput<xnode.host.config.update_input, xnode.host.config.update_output>;
declare function useHostConfigBuild(input?: UseMutationInput<xnode.host.config.build_input, xnode.host.config.build_output>): UseMutationOutput<xnode.host.config.build_input, xnode.host.config.build_output>;
declare function useHostConfigApply(input?: UseMutationInput<xnode.host.config.apply_input, xnode.host.config.apply_output>): UseMutationOutput<xnode.host.config.apply_input, xnode.host.config.apply_output>;

declare function useHostFileMetadata({ client, path, overrides, }: UseQueryInput<xnode.host.file.metadata_input, xnode.host.file.metadata_output>): UseQueryOutput<xnode.host.file.metadata_output>;
declare function useHostFileSize({ client, path, overrides, }: UseQueryInput<xnode.host.file.size_input, xnode.host.file.size_output>): UseQueryOutput<xnode.host.file.size_output>;
declare function useHostFileMove(input?: UseMutationInput<xnode.host.file.move_input, xnode.host.file.move_output>): UseMutationOutput<xnode.host.file.move_input, xnode.host.file.move_output>;
declare function useHostFileRemove(input?: UseMutationInput<xnode.host.file.remove_input, xnode.host.file.remove_output>): UseMutationOutput<xnode.host.file.remove_input, xnode.host.file.remove_output>;
declare function useHostFileCopy(input?: UseMutationInput<xnode.host.file.copy_input, xnode.host.file.copy_output>): UseMutationOutput<xnode.host.file.copy_input, xnode.host.file.copy_output>;
declare function useHostFileReadFile({ client, path, overrides, }: UseQueryInput<xnode.host.file.read_file_input, xnode.host.file.read_file_output>): UseQueryOutput<xnode.host.file.read_file_output>;
declare function useHostFileWriteFile(input?: UseMutationInput<xnode.host.file.write_file_input, xnode.host.file.write_file_output>): UseMutationOutput<xnode.host.file.write_file_input, xnode.host.file.write_file_output>;
declare function useHostFileReadFolder({ client, path, metadata, overrides, }: UseQueryInput<xnode.host.file.read_folder_input, xnode.host.file.read_folder_output>): UseQueryOutput<xnode.host.file.read_folder_output>;
declare function useHostFileCreateFolder(input?: UseMutationInput<xnode.host.file.create_folder_input, xnode.host.file.create_folder_output>): UseMutationOutput<xnode.host.file.create_folder_input, xnode.host.file.create_folder_output>;
declare function useHostFileReadLink({ client, path, overrides, }: UseQueryInput<xnode.host.file.read_link_input, xnode.host.file.read_link_output>): UseQueryOutput<xnode.host.file.read_link_output>;
declare function useHostFileWriteLink(input?: UseMutationInput<xnode.host.file.write_link_input, xnode.host.file.write_link_output>): UseMutationOutput<xnode.host.file.write_link_input, xnode.host.file.write_link_output>;
declare function useHostFileGetPermissions({ client, path, overrides, }: UseQueryInput<xnode.host.file.get_permissions_input, xnode.host.file.get_permissions_output>): UseQueryOutput<xnode.host.file.get_permissions_output>;
declare function useHostFileSetPermissions(input?: UseMutationInput<xnode.host.file.set_permissions_input, xnode.host.file.set_permissions_output>): UseMutationOutput<xnode.host.file.set_permissions_input, xnode.host.file.set_permissions_output>;

declare function useHostInfoFlakeMetadata({ client, flake, overrides, }: UseQueryInput<xnode.host.info.flake.metadata_input, xnode.host.info.flake.metadata_output>): UseQueryOutput<xnode.host.info.flake.metadata_output>;
declare function useHostInfoEval({ client, statement, overrides, }: UseQueryInput<xnode.host.info.eval_input, xnode.host.info.eval_output>): UseQueryOutput<xnode.host.info.eval_output>;
declare function useHostInfoUsersUsers({ client, overrides, }: UseQueryInput<xnode.host.info.users.users_input, xnode.host.info.users.users_output>): UseQueryOutput<xnode.host.info.users.users_output>;
declare function useHostInfoUsersGroups({ client, overrides, }: UseQueryInput<xnode.host.info.users.groups_input, xnode.host.info.users.groups_output>): UseQueryOutput<xnode.host.info.users.groups_output>;

declare function useHostListProcess({ client, overrides, }: UseQueryInput<xnode.host.list.process_input, xnode.host.list.process_output>): UseQueryOutput<xnode.host.list.process_output>;
declare function useHostListContainer({ client, overrides, }: UseQueryInput<xnode.host.list.container_input, xnode.host.list.container_output>): UseQueryOutput<xnode.host.list.container_output>;

declare function useHostPowerOff(input?: UseMutationInput<xnode.host.power.off_input, xnode.host.power.off_output>): UseMutationOutput<xnode.host.power.off_input, xnode.host.power.off_output>;
declare function useHostPowerReboot(input?: UseMutationInput<xnode.host.power.reboot_input, xnode.host.power.reboot_output>): UseMutationOutput<xnode.host.power.reboot_input, xnode.host.power.reboot_output>;

declare function useHostProcessLogs({ client, process, level, max, overrides, }: UseQueryInput<xnode.host.process.logs_input, xnode.host.process.logs_output>): UseQueryOutput<xnode.host.process.logs_output>;
declare function useHostProcessStatus({ client, process, overrides, }: UseQueryInput<xnode.host.process.status_input, xnode.host.process.status_output>): UseQueryOutput<xnode.host.process.status_output>;
declare function useHostProcessUsage({ client, process, overrides, }: UseQueryInput<xnode.host.process.usage_input, xnode.host.process.usage_output>): UseQueryOutput<xnode.host.process.usage_output>;
declare function useHostProcessStart(input?: UseMutationInput<xnode.host.process.start_input, xnode.host.process.start_output>): UseMutationOutput<xnode.host.process.start_input, xnode.host.process.start_output>;
declare function useHostProcessStop(input?: UseMutationInput<xnode.host.process.stop_input, xnode.host.process.stop_output>): UseMutationOutput<xnode.host.process.stop_input, xnode.host.process.stop_output>;
declare function useHostProcessRestart(input?: UseMutationInput<xnode.host.process.restart_input, xnode.host.process.restart_output>): UseMutationOutput<xnode.host.process.restart_input, xnode.host.process.restart_output>;
declare function useHostProcessReload(input?: UseMutationInput<xnode.host.process.reload_input, xnode.host.process.reload_output>): UseMutationOutput<xnode.host.process.reload_input, xnode.host.process.reload_output>;

declare function useHostUsageCpu({ client, overrides, }: UseQueryInput<xnode.host.usage.cpu_input, xnode.host.usage.cpu_output>): UseQueryOutput<xnode.host.usage.cpu_output>;
declare function useHostUsageMemory({ client, overrides, }: UseQueryInput<xnode.host.usage.memory_input, xnode.host.usage.memory_output>): UseQueryOutput<xnode.host.usage.memory_output>;
declare function useHostUsageDisk({ client, overrides, }: UseQueryInput<xnode.host.usage.disk_input, xnode.host.usage.disk_output>): UseQueryOutput<xnode.host.usage.disk_output>;
declare function useHostUsageNetwork({ client, overrides, }: UseQueryInput<xnode.host.usage.network_input, xnode.host.usage.network_output>): UseQueryOutput<xnode.host.usage.network_output>;
declare function useHostUsageGpu({ client, overrides, }: UseQueryInput<xnode.host.usage.gpu_input, xnode.host.usage.gpu_output>): UseQueryOutput<xnode.host.usage.gpu_output>;

export { useContainerConfigApply, useContainerConfigBuild, useContainerConfigGet, useContainerConfigSet, useContainerConfigUpdate, useContainerConfigVersion, useContainerCreate, useContainerFileCopy, useContainerFileCreateFolder, useContainerFileGetPermissions, useContainerFileMetadata, useContainerFileMove, useContainerFileReadFile, useContainerFileReadFolder, useContainerFileReadLink, useContainerFileRemove, useContainerFileSetPermissions, useContainerFileSize, useContainerFileWriteFile, useContainerInfoUsersGroups, useContainerInfoUsersUsers, useContainerListProcess, useContainerProcessLogs, useContainerProcessReload, useContainerProcessRestart, useContainerProcessStart, useContainerProcessStatus, useContainerProcessStop, useContainerProcessUsage, useContainerRemove, useContainerWriteLink, useHostConfigApply, useHostConfigBuild, useHostConfigGet, useHostConfigSet, useHostConfigUpdate, useHostConfigVersion, useHostFileCopy, useHostFileCreateFolder, useHostFileGetPermissions, useHostFileMetadata, useHostFileMove, useHostFileReadFile, useHostFileReadFolder, useHostFileReadLink, useHostFileRemove, useHostFileSetPermissions, useHostFileSize, useHostFileWriteFile, useHostFileWriteLink, useHostInfoEval, useHostInfoFlakeMetadata, useHostInfoUsersGroups, useHostInfoUsersUsers, useHostListContainer, useHostListProcess, useHostPowerOff, useHostPowerReboot, useHostProcessLogs, useHostProcessReload, useHostProcessRestart, useHostProcessStart, useHostProcessStatus, useHostProcessStop, useHostProcessUsage, useHostUsageCpu, useHostUsageDisk, useHostUsageGpu, useHostUsageMemory, useHostUsageNetwork, utils_d as utils };
