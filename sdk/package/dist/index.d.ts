type bool = boolean;
type u8 = number;
type u32 = number;
type u64 = number;
type f32 = number;
type String$1 = string;
type Option<T> = T | null;
type Vec<T> = T[];
type HashMap<K extends string | number | symbol, V> = Record<K, V>;

type rustTypes_d_HashMap<K extends string | number | symbol, V> = HashMap<K, V>;
type rustTypes_d_Option<T> = Option<T>;
type rustTypes_d_Vec<T> = Vec<T>;
type rustTypes_d_bool = bool;
type rustTypes_d_f32 = f32;
type rustTypes_d_u32 = u32;
type rustTypes_d_u64 = u64;
type rustTypes_d_u8 = u8;
declare namespace rustTypes_d {
  export type { rustTypes_d_HashMap as HashMap, rustTypes_d_Option as Option, String$1 as String, rustTypes_d_Vec as Vec, rustTypes_d_bool as bool, rustTypes_d_f32 as f32, rustTypes_d_u32 as u32, rustTypes_d_u64 as u64, rustTypes_d_u8 as u8 };
}

type Bytes = Uint8Array<ArrayBuffer>;
declare function isBytes(value: any): value is Bytes;

type bytes_d_Bytes = Bytes;
declare const bytes_d_isBytes: typeof isBytes;
declare namespace bytes_d {
  export { bytes_d_isBytes as isBytes };
  export type { bytes_d_Bytes as Bytes };
}

type Login = {
    user?: string;
    signature?: string;
    timestamp?: string;
};
declare function getMessage({ domain, timestamp, }: {
    domain: string;
    timestamp: number;
}): string;
declare function ipLogin(): Login;
declare function ethereumLogin({ address, timestamp, signature, }: {
    address: `0x${string}`;
    timestamp: number;
    signature: `0x${string}`;
}): Login;
declare function passwordLogin({ username, timestamp, signature, }: {
    username: `0x${string}`;
    timestamp: number;
    signature: `0x${string}`;
}): Login;

type login_d_Login = Login;
declare const login_d_ethereumLogin: typeof ethereumLogin;
declare const login_d_getMessage: typeof getMessage;
declare const login_d_ipLogin: typeof ipLogin;
declare const login_d_passwordLogin: typeof passwordLogin;
declare namespace login_d {
  export { login_d_ethereumLogin as ethereumLogin, login_d_getMessage as getMessage, login_d_ipLogin as ipLogin, login_d_passwordLogin as passwordLogin };
  export type { login_d_Login as Login };
}

type Client = {
    login: Login;
    baseUrl: string;
};
type WithClient<T> = {
    client: Client;
} & T;
type QueryValue = string | number | boolean | null | undefined;
type QueryBase = Record<string, QueryValue>;
declare function JsonGet<Output extends Object, Path, Query extends QueryBase | undefined>(input: WithClient<{
    path?: Path;
    query?: Query;
}>, path: Path extends Object ? (path: Path) => string : string): Promise<Output>;
declare function RawGet<Path, Query extends QueryBase | undefined>(input: WithClient<{
    path?: Path;
    query?: Query;
}>, path: Path extends Object ? (path: Path) => string : string): Promise<Uint8Array<ArrayBuffer>>;
declare function JsonPost<Output extends Object, Path, Query extends QueryBase | undefined, Data>(input: WithClient<{
    path?: Path;
    query?: Query;
    data?: Data extends Bytes ? Bytes : Object;
}>, path: Path extends Object ? (path: Path) => string : string): Promise<Output>;
declare function RawPost<Path, Query extends QueryBase | undefined, Data>(input: WithClient<{
    path?: Path;
    query?: Query;
    data?: Data extends Bytes ? Bytes : Object;
}>, path: Path extends Object ? (path: Path) => string : string): Promise<Bytes>;

type client_d_Client = Client;
declare const client_d_JsonGet: typeof JsonGet;
declare const client_d_JsonPost: typeof JsonPost;
type client_d_QueryBase = QueryBase;
type client_d_QueryValue = QueryValue;
declare const client_d_RawGet: typeof RawGet;
declare const client_d_RawPost: typeof RawPost;
type client_d_WithClient<T> = WithClient<T>;
declare namespace client_d {
  export { client_d_JsonGet as JsonGet, client_d_JsonPost as JsonPost, client_d_RawGet as RawGet, client_d_RawPost as RawPost };
  export type { client_d_Client as Client, client_d_QueryBase as QueryBase, client_d_QueryValue as QueryValue, client_d_WithClient as WithClient };
}

type ResponseCommand = {
    id: String$1;
};
type CommandAfterCondition = "Always" | "Success";
type CommandAfter = {
    Command: {
        id: String$1;
        condition: Option<CommandAfterCondition>;
    };
} | {
    Date: {
        date: u64;
    };
};
type CommandOptions = {
    after: Option<CommandAfter>;
};

type command_d_CommandAfter = CommandAfter;
type command_d_CommandAfterCondition = CommandAfterCondition;
type command_d_CommandOptions = CommandOptions;
type command_d_ResponseCommand = ResponseCommand;
declare namespace command_d {
  export type { command_d_CommandAfter as CommandAfter, command_d_CommandAfterCondition as CommandAfterCondition, command_d_CommandOptions as CommandOptions, command_d_ResponseCommand as ResponseCommand };
}

declare function awaitCommand({ client, command, pollInterval, }: {
    client: Client;
    command: ResponseCommand;
    pollInterval?: number;
}): Promise<void>;

declare const helpers_d_awaitCommand: typeof awaitCommand;
declare namespace helpers_d {
  export {
    helpers_d_awaitCommand as awaitCommand,
  };
}

declare namespace index_d$g {
  export {
    bytes_d as bytes,
    client_d as client,
    helpers_d as helpers,
    login_d as login,
    rustTypes_d as rust_types,
  };
}

type Metadata = {
    File: {};
} | {
    Folder: {};
} | {
    Link: {};
} | {
    Unknown: {};
};
type Size = {
    exclusive: u64;
    shared: u64;
};
type ReadFolderOptions = {
    metadata: Option<bool>;
};
type FolderItem = {
    name: String$1;
    metadata: Option<Metadata>;
};
type Entity = {
    User: u32;
} | {
    Group: u32;
} | "Any" | "Unknown";
type Permission = {
    granted_to: Entity;
    read: bool;
    write: bool;
    execute: bool;
};
type PathQuery = {
    path: String$1;
};
type SourceDestinationData = {
    source: String$1;
    destination: String$1;
};

type file_d_Entity = Entity;
type file_d_FolderItem = FolderItem;
type file_d_Metadata = Metadata;
type file_d_PathQuery = PathQuery;
type file_d_Permission = Permission;
type file_d_ReadFolderOptions = ReadFolderOptions;
type file_d_Size = Size;
type file_d_SourceDestinationData = SourceDestinationData;
declare namespace file_d {
  export type { file_d_Entity as Entity, file_d_FolderItem as FolderItem, file_d_Metadata as Metadata, file_d_PathQuery as PathQuery, file_d_Permission as Permission, file_d_ReadFolderOptions as ReadFolderOptions, file_d_Size as Size, file_d_SourceDestinationData as SourceDestinationData };
}

type User = {
    name: String$1;
    id: u32;
    group: u32;
    description: String$1;
    home: String$1;
    login: String$1;
};
type Group = {
    name: String$1;
    id: u32;
    members: Vec<String$1>;
};

type info_d_Group = Group;
type info_d_User = User;
declare namespace info_d {
  export type { info_d_Group as Group, info_d_User as User };
}

type FlakeMetadata = {
    last_modified: u64;
    revision: String$1;
};
type UpdateData = {
    inputs: Vec<String$1>;
};
type ApplyWhen = "Now" | "NextBoot";
type ApplyQuery = {
    when: Option<ApplyWhen>;
};

type nix_d_ApplyQuery = ApplyQuery;
type nix_d_ApplyWhen = ApplyWhen;
type nix_d_FlakeMetadata = FlakeMetadata;
type nix_d_UpdateData = UpdateData;
declare namespace nix_d {
  export type { nix_d_ApplyQuery as ApplyQuery, nix_d_ApplyWhen as ApplyWhen, nix_d_FlakeMetadata as FlakeMetadata, nix_d_UpdateData as UpdateData };
}

type Process = {
    name: String$1;
    description: Option<String$1>;
    running: bool;
};
type Status = {
    running: bool;
};
type LogQuery = {
    level: Option<LogLevel>;
    after: Option<u64>;
    max: Option<u32>;
};
type Log = {
    timestamp: u64;
    message: String$1;
    level: LogLevel;
};
type LogLevel = "Error" | "Warn" | "Info" | "Unknown";
type Usage = {
    cpu: Option<u64>;
    memory: Option<u64>;
    network_ingress: Option<u64>;
    network_egress: Option<u64>;
    disk_read: Option<u64>;
    disk_write: Option<u64>;
};

type process_d_Log = Log;
type process_d_LogLevel = LogLevel;
type process_d_LogQuery = LogQuery;
type process_d_Process = Process;
type process_d_Status = Status;
type process_d_Usage = Usage;
declare namespace process_d {
  export type { process_d_Log as Log, process_d_LogLevel as LogLevel, process_d_LogQuery as LogQuery, process_d_Process as Process, process_d_Status as Status, process_d_Usage as Usage };
}

type ResponseError = {
    error: String$1;
    typed_error: Option<TypedResponseError>;
};
type TypedResponseError = {
    PathNotFound: {
        path: String$1;
    };
};
type ResponseResult<T> = T;

type response_d_ResponseError = ResponseError;
type response_d_ResponseResult<T> = ResponseResult<T>;
type response_d_TypedResponseError = TypedResponseError;
declare namespace response_d {
  export type { response_d_ResponseError as ResponseError, response_d_ResponseResult as ResponseResult, response_d_TypedResponseError as TypedResponseError };
}

declare namespace index_d$f {
  export {
    command_d as command,
    file_d as file,
    info_d as info,
    nix_d as nix,
    process_d as process,
    response_d as response,
    index_d$g as utils,
  };
}

type ContainerPath = {
    container: string;
};

declare function scope$b<Path extends ContainerPath>(path: Path): string;
type get_input$1 = WithClient<{
    path: ContainerPath;
}>;
type get_output$1 = ResponseResult<Bytes>;
declare function get$1(input: get_input$1): Promise<get_output$1>;
type set_input$1 = WithClient<{
    path: ContainerPath;
    data: Bytes;
}>;
type set_output$1 = ResponseResult<Bytes>;
declare function set$1(input: set_input$1): Promise<set_output$1>;
type version_input$1 = WithClient<{
    path: ContainerPath;
}>;
type version_output$1 = ResponseResult<Bytes>;
declare function version$1(input: version_input$1): Promise<version_output$1>;
type update_input$1 = WithClient<{
    path: ContainerPath;
    data: UpdateData & CommandOptions;
}>;
type update_output$1 = ResponseCommand;
declare function update$1(input: update_input$1): Promise<update_output$1>;
type build_input$1 = WithClient<{
    path: ContainerPath;
    data: CommandOptions;
}>;
type build_output$1 = ResponseCommand;
declare function build$1(input: build_input$1): Promise<build_output$1>;
type apply_input$1 = WithClient<{
    path: ContainerPath;
    query: ApplyQuery;
    data: CommandOptions;
}>;
type apply_output$1 = ResponseResult<ResponseCommand>;
declare function apply$1(input: apply_input$1): Promise<apply_output$1>;

declare namespace index_d$e {
  export { apply$1 as apply, build$1 as build, get$1 as get, scope$b as scope, set$1 as set, update$1 as update, version$1 as version };
  export type { apply_input$1 as apply_input, apply_output$1 as apply_output, build_input$1 as build_input, build_output$1 as build_output, get_input$1 as get_input, get_output$1 as get_output, set_input$1 as set_input, set_output$1 as set_output, update_input$1 as update_input, update_output$1 as update_output, version_input$1 as version_input, version_output$1 as version_output };
}

declare function scope$a<Path extends ContainerPath>(path: Path): string;
type metadata_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type metadata_output$1 = ResponseResult<Metadata>;
declare function metadata$1(input: metadata_input$1): Promise<metadata_output$1>;
type size_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type size_output$1 = ResponseResult<Size>;
declare function size$1(input: size_input$1): Promise<size_output$1>;
type move_input$1 = WithClient<{
    path: ContainerPath;
    data: SourceDestinationData;
}>;
type move_output$1 = ResponseResult<Bytes>;
declare function move$1(input: move_input$1): Promise<move_output$1>;
type remove_input$2 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type remove_output$2 = ResponseResult<Bytes>;
declare function remove$2(input: remove_input$2): Promise<remove_output$2>;
type copy_input$1 = WithClient<{
    path: ContainerPath;
    data: SourceDestinationData;
}>;
type copy_output$1 = ResponseResult<Bytes>;
declare function copy$1(input: copy_input$1): Promise<copy_output$1>;
type read_file_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type read_file_output$1 = ResponseResult<Bytes>;
declare function read_file$1(input: read_file_input$1): Promise<read_file_output$1>;
type write_file_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
    data: Bytes;
}>;
type write_file_output$1 = ResponseResult<Bytes>;
declare function write_file$1(input: write_file_input$1): Promise<write_file_output$1>;
type read_folder_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery & ReadFolderOptions;
}>;
type read_folder_output$1 = ResponseResult<Vec<FolderItem>>;
declare function read_folder$1(input: read_folder_input$1): Promise<read_folder_output$1>;
type create_folder_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type create_folder_output$1 = ResponseResult<Bytes>;
declare function create_folder$1(input: create_folder_input$1): Promise<create_folder_output$1>;
type read_link_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type read_link_output$1 = ResponseResult<String>;
declare function read_link$1(input: read_link_input$1): Promise<read_link_output$1>;
type get_permissions_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
}>;
type get_permissions_output$1 = ResponseResult<Vec<Permission>>;
declare function get_permissions$1(input: get_permissions_input$1): Promise<get_permissions_output$1>;
type set_permissions_input$1 = WithClient<{
    path: ContainerPath;
    query: PathQuery;
    data: Vec<Permission>;
}>;
type set_permissions_output$1 = ResponseResult<Bytes>;
declare function set_permissions$1(input: set_permissions_input$1): Promise<set_permissions_output$1>;

declare namespace index_d$d {
  export { copy$1 as copy, create_folder$1 as create_folder, get_permissions$1 as get_permissions, metadata$1 as metadata, move$1 as move, read_file$1 as read_file, read_folder$1 as read_folder, read_link$1 as read_link, remove$2 as remove, scope$a as scope, set_permissions$1 as set_permissions, size$1 as size, write_file$1 as write_file };
  export type { copy_input$1 as copy_input, copy_output$1 as copy_output, create_folder_input$1 as create_folder_input, create_folder_output$1 as create_folder_output, get_permissions_input$1 as get_permissions_input, get_permissions_output$1 as get_permissions_output, metadata_input$1 as metadata_input, metadata_output$1 as metadata_output, move_input$1 as move_input, move_output$1 as move_output, read_file_input$1 as read_file_input, read_file_output$1 as read_file_output, read_folder_input$1 as read_folder_input, read_folder_output$1 as read_folder_output, read_link_input$1 as read_link_input, read_link_output$1 as read_link_output, remove_input$2 as remove_input, remove_output$2 as remove_output, set_permissions_input$1 as set_permissions_input, set_permissions_output$1 as set_permissions_output, size_input$1 as size_input, size_output$1 as size_output, write_file_input$1 as write_file_input, write_file_output$1 as write_file_output };
}

declare function scope$9<Path extends ContainerPath>(path: Path): string;
declare namespace users$1 {
    type users_input = WithClient<{
        path: ContainerPath;
    }>;
    type users_output = ResponseResult<Vec<User>>;
    function users(input: users_input): Promise<users_output>;
    type groups_input = WithClient<{
        path: ContainerPath;
    }>;
    type groups_output = ResponseResult<Vec<Group>>;
    function groups(input: groups_input): Promise<groups_output>;
}

type FlakeQuery$1 = {
    flake: String$1;
};
type EvalQuery$1 = {
    statement: String$1;
};

declare namespace index_d$c {
  export { scope$9 as scope, users$1 as users };
  export type { EvalQuery$1 as EvalQuery, FlakeQuery$1 as FlakeQuery };
}

declare function scope$8<Path extends ContainerPath>(path: Path): string;
type process_input$1 = WithClient<{
    path: ContainerPath;
}>;
type process_output$1 = ResponseResult<Vec<Process>>;
declare function process$1(input: process_input$1): Promise<process_output$1>;

declare namespace index_d$b {
  export { process$1 as process, scope$8 as scope };
  export type { process_input$1 as process_input, process_output$1 as process_output };
}

type ProcessPath$1 = {
    process: String$1;
};

declare function scope$7<Path extends ContainerPath>(path: Path): string;
type logs_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
    query?: LogQuery;
}>;
type logs_output$1 = ResponseResult<Vec<Log>>;
declare function logs$1(input: logs_input$1): Promise<logs_output$1>;
type status_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type status_output$1 = ResponseResult<Status>;
declare function status$1(input: status_input$1): Promise<status_output$1>;
type usage_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type usage_output$1 = ResponseResult<Usage>;
declare function usage$1(input: usage_input$1): Promise<usage_output$1>;
type start_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type start_output$1 = ResponseResult<Bytes>;
declare function start$1(input: start_input$1): Promise<start_output$1>;
type stop_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type stop_output$1 = ResponseResult<Bytes>;
declare function stop$1(input: stop_input$1): Promise<stop_output$1>;
type restart_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type restart_output$1 = ResponseResult<Bytes>;
declare function restart$1(input: restart_input$1): Promise<restart_output$1>;
type reload_input$1 = WithClient<{
    path: ContainerPath & ProcessPath$1;
}>;
type reload_output$1 = ResponseResult<Bytes>;
declare function reload$1(input: reload_input$1): Promise<reload_output$1>;

declare namespace index_d$a {
  export { logs$1 as logs, reload$1 as reload, restart$1 as restart, scope$7 as scope, start$1 as start, status$1 as status, stop$1 as stop, usage$1 as usage };
  export type { ProcessPath$1 as ProcessPath, logs_input$1 as logs_input, logs_output$1 as logs_output, reload_input$1 as reload_input, reload_output$1 as reload_output, restart_input$1 as restart_input, restart_output$1 as restart_output, start_input$1 as start_input, start_output$1 as start_output, status_input$1 as status_input, status_output$1 as status_output, stop_input$1 as stop_input, stop_output$1 as stop_output, usage_input$1 as usage_input, usage_output$1 as usage_output };
}

type remove_input$1 = WithClient<{
    path: ContainerPath;
}>;
type remove_output$1 = ResponseResult<Bytes>;
declare function remove$1(input: remove_input$1): Promise<remove_output$1>;

declare namespace index_d$9 {
  export { index_d$e as config, index_d$d as file, index_d$c as info, index_d$b as list, index_d$a as process, remove$1 as remove };
  export type { remove_input$1 as remove_input, remove_output$1 as remove_output };
}

declare function scope$6(): string;
type get_input = WithClient<{}>;
type get_output = ResponseResult<Bytes>;
declare function get(input: get_input): Promise<get_output>;
type set_input = WithClient<{
    data: Bytes;
}>;
type set_output = ResponseResult<Bytes>;
declare function set(input: set_input): Promise<set_output>;
type version_input = WithClient<{}>;
type version_output = ResponseResult<Bytes>;
declare function version(input: version_input): Promise<version_output>;
type update_input = WithClient<{
    data: UpdateData & CommandOptions;
}>;
type update_output = ResponseCommand;
declare function update(input: update_input): Promise<update_output>;
type build_input = WithClient<{
    data: CommandOptions;
}>;
type build_output = ResponseCommand;
declare function build(input: build_input): Promise<build_output>;
type apply_input = WithClient<{
    query: ApplyQuery;
    data: CommandOptions;
}>;
type apply_output = ResponseResult<ResponseCommand>;
declare function apply(input: apply_input): Promise<apply_output>;

declare const index_d$8_apply: typeof apply;
type index_d$8_apply_input = apply_input;
type index_d$8_apply_output = apply_output;
declare const index_d$8_build: typeof build;
type index_d$8_build_input = build_input;
type index_d$8_build_output = build_output;
declare const index_d$8_get: typeof get;
type index_d$8_get_input = get_input;
type index_d$8_get_output = get_output;
declare const index_d$8_set: typeof set;
type index_d$8_set_input = set_input;
type index_d$8_set_output = set_output;
declare const index_d$8_update: typeof update;
type index_d$8_update_input = update_input;
type index_d$8_update_output = update_output;
declare const index_d$8_version: typeof version;
type index_d$8_version_input = version_input;
type index_d$8_version_output = version_output;
declare namespace index_d$8 {
  export { index_d$8_apply as apply, index_d$8_build as build, index_d$8_get as get, scope$6 as scope, index_d$8_set as set, index_d$8_update as update, index_d$8_version as version };
  export type { index_d$8_apply_input as apply_input, index_d$8_apply_output as apply_output, index_d$8_build_input as build_input, index_d$8_build_output as build_output, index_d$8_get_input as get_input, index_d$8_get_output as get_output, index_d$8_set_input as set_input, index_d$8_set_output as set_output, index_d$8_update_input as update_input, index_d$8_update_output as update_output, index_d$8_version_input as version_input, index_d$8_version_output as version_output };
}

declare function scope$5(): string;
type metadata_input = WithClient<{
    query: PathQuery;
}>;
type metadata_output = ResponseResult<Metadata>;
declare function metadata(input: metadata_input): Promise<metadata_output>;
type size_input = WithClient<{
    query: PathQuery;
}>;
type size_output = ResponseResult<Size>;
declare function size(input: size_input): Promise<size_output>;
type move_input = WithClient<{
    data: SourceDestinationData;
}>;
type move_output = ResponseResult<Bytes>;
declare function move(input: move_input): Promise<move_output>;
type remove_input = WithClient<{
    query: PathQuery;
}>;
type remove_output = ResponseResult<Bytes>;
declare function remove(input: remove_input): Promise<remove_output>;
type copy_input = WithClient<{
    data: SourceDestinationData;
}>;
type copy_output = ResponseResult<Bytes>;
declare function copy(input: copy_input): Promise<copy_output>;
type read_file_input = WithClient<{
    query: PathQuery;
}>;
type read_file_output = ResponseResult<Bytes>;
declare function read_file(input: read_file_input): Promise<read_file_output>;
type write_file_input = WithClient<{
    query: PathQuery;
    data: Bytes;
}>;
type write_file_output = ResponseResult<Bytes>;
declare function write_file(input: write_file_input): Promise<write_file_output>;
type read_folder_input = WithClient<{
    query: PathQuery & ReadFolderOptions;
}>;
type read_folder_output = ResponseResult<Vec<FolderItem>>;
declare function read_folder(input: read_folder_input): Promise<read_folder_output>;
type create_folder_input = WithClient<{
    query: PathQuery;
}>;
type create_folder_output = ResponseResult<Bytes>;
declare function create_folder(input: create_folder_input): Promise<create_folder_output>;
type read_link_input = WithClient<{
    query: PathQuery;
}>;
type read_link_output = ResponseResult<String>;
declare function read_link(input: read_link_input): Promise<read_link_output>;
type get_permissions_input = WithClient<{
    query: PathQuery;
}>;
type get_permissions_output = ResponseResult<Vec<Permission>>;
declare function get_permissions(input: get_permissions_input): Promise<get_permissions_output>;
type set_permissions_input = WithClient<{
    query: PathQuery;
    data: Vec<Permission>;
}>;
type set_permissions_output = ResponseResult<Bytes>;
declare function set_permissions(input: set_permissions_input): Promise<set_permissions_output>;

declare const index_d$7_copy: typeof copy;
type index_d$7_copy_input = copy_input;
type index_d$7_copy_output = copy_output;
declare const index_d$7_create_folder: typeof create_folder;
type index_d$7_create_folder_input = create_folder_input;
type index_d$7_create_folder_output = create_folder_output;
declare const index_d$7_get_permissions: typeof get_permissions;
type index_d$7_get_permissions_input = get_permissions_input;
type index_d$7_get_permissions_output = get_permissions_output;
declare const index_d$7_metadata: typeof metadata;
type index_d$7_metadata_input = metadata_input;
type index_d$7_metadata_output = metadata_output;
declare const index_d$7_move: typeof move;
type index_d$7_move_input = move_input;
type index_d$7_move_output = move_output;
declare const index_d$7_read_file: typeof read_file;
type index_d$7_read_file_input = read_file_input;
type index_d$7_read_file_output = read_file_output;
declare const index_d$7_read_folder: typeof read_folder;
type index_d$7_read_folder_input = read_folder_input;
type index_d$7_read_folder_output = read_folder_output;
declare const index_d$7_read_link: typeof read_link;
type index_d$7_read_link_input = read_link_input;
type index_d$7_read_link_output = read_link_output;
declare const index_d$7_remove: typeof remove;
type index_d$7_remove_input = remove_input;
type index_d$7_remove_output = remove_output;
declare const index_d$7_set_permissions: typeof set_permissions;
type index_d$7_set_permissions_input = set_permissions_input;
type index_d$7_set_permissions_output = set_permissions_output;
declare const index_d$7_size: typeof size;
type index_d$7_size_input = size_input;
type index_d$7_size_output = size_output;
declare const index_d$7_write_file: typeof write_file;
type index_d$7_write_file_input = write_file_input;
type index_d$7_write_file_output = write_file_output;
declare namespace index_d$7 {
  export { index_d$7_copy as copy, index_d$7_create_folder as create_folder, index_d$7_get_permissions as get_permissions, index_d$7_metadata as metadata, index_d$7_move as move, index_d$7_read_file as read_file, index_d$7_read_folder as read_folder, index_d$7_read_link as read_link, index_d$7_remove as remove, scope$5 as scope, index_d$7_set_permissions as set_permissions, index_d$7_size as size, index_d$7_write_file as write_file };
  export type { index_d$7_copy_input as copy_input, index_d$7_copy_output as copy_output, index_d$7_create_folder_input as create_folder_input, index_d$7_create_folder_output as create_folder_output, index_d$7_get_permissions_input as get_permissions_input, index_d$7_get_permissions_output as get_permissions_output, index_d$7_metadata_input as metadata_input, index_d$7_metadata_output as metadata_output, index_d$7_move_input as move_input, index_d$7_move_output as move_output, index_d$7_read_file_input as read_file_input, index_d$7_read_file_output as read_file_output, index_d$7_read_folder_input as read_folder_input, index_d$7_read_folder_output as read_folder_output, index_d$7_read_link_input as read_link_input, index_d$7_read_link_output as read_link_output, index_d$7_remove_input as remove_input, index_d$7_remove_output as remove_output, index_d$7_set_permissions_input as set_permissions_input, index_d$7_set_permissions_output as set_permissions_output, index_d$7_size_input as size_input, index_d$7_size_output as size_output, index_d$7_write_file_input as write_file_input, index_d$7_write_file_output as write_file_output };
}

type FlakeQuery = {
    flake: String$1;
};
type EvalQuery = {
    statement: String$1;
};

declare function scope$4(): string;
declare namespace flake {
    type metadata_input = WithClient<{
        query: FlakeQuery;
    }>;
    type metadata_output = ResponseResult<FlakeMetadata>;
    function metadata(input: metadata_input): Promise<metadata_output>;
}
type eval_input = WithClient<{
    query: EvalQuery;
}>;
type eval_output = ResponseResult<String$1>;
declare function _eval(input: eval_input): Promise<eval_output>;

declare namespace users {
    type users_input = WithClient<{}>;
    type users_output = ResponseResult<Vec<User>>;
    function users(input: users_input): Promise<users_output>;
    type groups_input = WithClient<{}>;
    type groups_output = ResponseResult<Vec<Group>>;
    function groups(input: groups_input): Promise<groups_output>;
}

type index_d$6_EvalQuery = EvalQuery;
type index_d$6_FlakeQuery = FlakeQuery;
type index_d$6_eval_input = eval_input;
type index_d$6_eval_output = eval_output;
import index_d$6_flake = flake;
import index_d$6_users = users;
declare namespace index_d$6 {
  export { _eval as eval, index_d$6_flake as flake, scope$4 as scope, index_d$6_users as users };
  export type { index_d$6_EvalQuery as EvalQuery, index_d$6_FlakeQuery as FlakeQuery, index_d$6_eval_input as eval_input, index_d$6_eval_output as eval_output };
}

declare function scope$3(): string;
type process_input = WithClient<{}>;
type process_output = ResponseResult<Vec<Process>>;
declare function process(input: process_input): Promise<process_output>;
type container_input = WithClient<{}>;
type container_output = ResponseResult<Vec<String$1>>;
declare function container(input: container_input): Promise<container_output>;

declare const index_d$5_container: typeof container;
type index_d$5_container_input = container_input;
type index_d$5_container_output = container_output;
declare const index_d$5_process: typeof process;
type index_d$5_process_input = process_input;
type index_d$5_process_output = process_output;
declare namespace index_d$5 {
  export { index_d$5_container as container, index_d$5_process as process, scope$3 as scope };
  export type { index_d$5_container_input as container_input, index_d$5_container_output as container_output, index_d$5_process_input as process_input, index_d$5_process_output as process_output };
}

declare function scope$2(): string;
type off_input = WithClient<{}>;
type off_output = ResponseResult<Bytes>;
declare function off(input: off_input): Promise<off_output>;
type reboot_input = WithClient<{}>;
type reboot_output = ResponseResult<Bytes>;
declare function reboot(input: reboot_input): Promise<reboot_output>;

declare const index_d$4_off: typeof off;
type index_d$4_off_input = off_input;
type index_d$4_off_output = off_output;
declare const index_d$4_reboot: typeof reboot;
type index_d$4_reboot_input = reboot_input;
type index_d$4_reboot_output = reboot_output;
declare namespace index_d$4 {
  export { index_d$4_off as off, index_d$4_reboot as reboot, scope$2 as scope };
  export type { index_d$4_off_input as off_input, index_d$4_off_output as off_output, index_d$4_reboot_input as reboot_input, index_d$4_reboot_output as reboot_output };
}

type ProcessPath = {
    process: String$1;
};

declare function scope$1(): string;
type logs_input = WithClient<{
    path: ProcessPath;
    query?: LogQuery;
}>;
type logs_output = ResponseResult<Vec<Log>>;
declare function logs(input: logs_input): Promise<logs_output>;
type status_input = WithClient<{
    path: ProcessPath;
}>;
type status_output = ResponseResult<Status>;
declare function status(input: status_input): Promise<status_output>;
type usage_input = WithClient<{
    path: ProcessPath;
}>;
type usage_output = ResponseResult<Usage>;
declare function usage(input: usage_input): Promise<usage_output>;
type start_input = WithClient<{
    path: ProcessPath;
}>;
type start_output = ResponseResult<Bytes>;
declare function start(input: start_input): Promise<start_output>;
type stop_input = WithClient<{
    path: ProcessPath;
}>;
type stop_output = ResponseResult<Bytes>;
declare function stop(input: stop_input): Promise<stop_output>;
type restart_input = WithClient<{
    path: ProcessPath;
}>;
type restart_output = ResponseResult<Bytes>;
declare function restart(input: restart_input): Promise<restart_output>;
type reload_input = WithClient<{
    path: ProcessPath;
}>;
type reload_output = ResponseResult<Bytes>;
declare function reload(input: reload_input): Promise<reload_output>;

type index_d$3_ProcessPath = ProcessPath;
declare const index_d$3_logs: typeof logs;
type index_d$3_logs_input = logs_input;
type index_d$3_logs_output = logs_output;
declare const index_d$3_reload: typeof reload;
type index_d$3_reload_input = reload_input;
type index_d$3_reload_output = reload_output;
declare const index_d$3_restart: typeof restart;
type index_d$3_restart_input = restart_input;
type index_d$3_restart_output = restart_output;
declare const index_d$3_start: typeof start;
type index_d$3_start_input = start_input;
type index_d$3_start_output = start_output;
declare const index_d$3_status: typeof status;
type index_d$3_status_input = status_input;
type index_d$3_status_output = status_output;
declare const index_d$3_stop: typeof stop;
type index_d$3_stop_input = stop_input;
type index_d$3_stop_output = stop_output;
declare const index_d$3_usage: typeof usage;
type index_d$3_usage_input = usage_input;
type index_d$3_usage_output = usage_output;
declare namespace index_d$3 {
  export { index_d$3_logs as logs, index_d$3_reload as reload, index_d$3_restart as restart, scope$1 as scope, index_d$3_start as start, index_d$3_status as status, index_d$3_stop as stop, index_d$3_usage as usage };
  export type { index_d$3_ProcessPath as ProcessPath, index_d$3_logs_input as logs_input, index_d$3_logs_output as logs_output, index_d$3_reload_input as reload_input, index_d$3_reload_output as reload_output, index_d$3_restart_input as restart_input, index_d$3_restart_output as restart_output, index_d$3_start_input as start_input, index_d$3_start_output as start_output, index_d$3_status_input as status_input, index_d$3_status_output as status_output, index_d$3_stop_input as stop_input, index_d$3_stop_output as stop_output, index_d$3_usage_input as usage_input, index_d$3_usage_output as usage_output };
}

type CpuUsage = {
    name: String$1;
    used: f32;
    frequency: u64;
};
type MemoryUsage = {
    used: u64;
    total: u64;
};
type DiskUsage = {
    mount_point: String$1;
    used: u64;
    total: u64;
    read: u64;
    written: u64;
};
type NetworkUsage = {
    name: String$1;
    mac: String$1;
    addresses: Vec<String$1>;
    received: u64;
    transmitted: u64;
};
type GpuUsage = {
    Nvidia: {
        id: String$1;
        name: String$1;
        compute: f32;
        memory: MemoryUsage;
        power: Option<u32>;
    };
};

declare function scope(): string;
type cpu_input = WithClient<{}>;
type cpu_output = ResponseResult<Vec<CpuUsage>>;
declare function cpu(input: cpu_input): Promise<cpu_output>;
type memory_input = WithClient<{}>;
type memory_output = ResponseResult<MemoryUsage>;
declare function memory(input: memory_input): Promise<memory_output>;
type disk_input = WithClient<{}>;
type disk_output = ResponseResult<Vec<DiskUsage>>;
declare function disk(input: disk_input): Promise<disk_output>;
type network_input = WithClient<{}>;
type network_output = ResponseResult<Vec<NetworkUsage>>;
declare function network(input: network_input): Promise<network_output>;
type gpu_input = WithClient<{}>;
type gpu_output = ResponseResult<Vec<GpuUsage>>;
declare function gpu(input: gpu_input): Promise<gpu_output>;

type index_d$2_CpuUsage = CpuUsage;
type index_d$2_DiskUsage = DiskUsage;
type index_d$2_GpuUsage = GpuUsage;
type index_d$2_MemoryUsage = MemoryUsage;
type index_d$2_NetworkUsage = NetworkUsage;
declare const index_d$2_cpu: typeof cpu;
type index_d$2_cpu_input = cpu_input;
type index_d$2_cpu_output = cpu_output;
declare const index_d$2_disk: typeof disk;
type index_d$2_disk_input = disk_input;
type index_d$2_disk_output = disk_output;
declare const index_d$2_gpu: typeof gpu;
type index_d$2_gpu_input = gpu_input;
type index_d$2_gpu_output = gpu_output;
declare const index_d$2_memory: typeof memory;
type index_d$2_memory_input = memory_input;
type index_d$2_memory_output = memory_output;
declare const index_d$2_network: typeof network;
type index_d$2_network_input = network_input;
type index_d$2_network_output = network_output;
declare const index_d$2_scope: typeof scope;
declare namespace index_d$2 {
  export { index_d$2_cpu as cpu, index_d$2_disk as disk, index_d$2_gpu as gpu, index_d$2_memory as memory, index_d$2_network as network, index_d$2_scope as scope };
  export type { index_d$2_CpuUsage as CpuUsage, index_d$2_DiskUsage as DiskUsage, index_d$2_GpuUsage as GpuUsage, index_d$2_MemoryUsage as MemoryUsage, index_d$2_NetworkUsage as NetworkUsage, index_d$2_cpu_input as cpu_input, index_d$2_cpu_output as cpu_output, index_d$2_disk_input as disk_input, index_d$2_disk_output as disk_output, index_d$2_gpu_input as gpu_input, index_d$2_gpu_output as gpu_output, index_d$2_memory_input as memory_input, index_d$2_memory_output as memory_output, index_d$2_network_input as network_input, index_d$2_network_output as network_output };
}

declare namespace index_d$1 {
  export {
    index_d$8 as config,
    index_d$7 as file,
    index_d$6 as info,
    index_d$5 as list,
    index_d$4 as power,
    index_d$3 as process,
    index_d$2 as usage,
  };
}

declare namespace index_d {
  export {
    index_d$f as common,
    index_d$9 as container,
    index_d$1 as host,
  };
}

export { index_d as xnode };
