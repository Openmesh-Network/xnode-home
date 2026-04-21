var rustTypes = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function isBytes(value) {
    return value instanceof Uint8Array;
}

var bytes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBytes: isBytes
});

function queryString(query) {
    const out = {};
    for (const [key, value] of Object.entries(query)) {
        if (value === null || value === undefined)
            continue;
        switch (typeof value) {
            case "boolean":
                out[key] = value ? "true" : "false";
                break;
            default:
                out[key] = String(value);
                break;
        }
    }
    return `?${new URLSearchParams(out)}`;
}
function getUrl({ input, path, }) {
    return `${input.client.baseUrl}${input.path !== undefined && typeof path !== "string" ? path(input.path) : path}${input.query !== undefined ? queryString(input.query) : ""}`;
}
function loginArgs({ login }) {
    const headers = {};
    if (login.user)
        headers["Xnode-Auth-User"] = login.user;
    if (login.signature)
        headers["Xnode-Auth-Signature"] = login.signature;
    if (login.timestamp)
        headers["Xnode-Auth-Timestamp"] = login.timestamp;
    return { headers };
}
async function JsonGet(input, path) {
    return fetch(getUrl({ input, path }), loginArgs({ login: input.client.login })).then((res) => res.json());
}
async function RawGet(input, path) {
    return fetch(getUrl({ input, path }), loginArgs({ login: input.client.login })).then((res) => res.bytes());
}
function postArgs({ login, data, }) {
    const baseArgs = loginArgs({ login });
    const headers = baseArgs.headers;
    if (data !== undefined && !isBytes(data)) {
        headers["Content-Type"] = "application/json";
    }
    return {
        method: "POST",
        body: data === undefined
            ? undefined
            : isBytes(data)
                ? data
                : JSON.stringify(data),
        headers,
    };
}
async function JsonPost(input, path) {
    return fetch(getUrl({ input, path }), postArgs({ login: input.client.login, data: input.data })).then((res) => res.json());
}
async function RawPost(input, path) {
    return fetch(getUrl({ input, path }), postArgs({ login: input.client.login, data: input.data })).then((res) => res.bytes());
}

var client = /*#__PURE__*/Object.freeze({
    __proto__: null,
    JsonGet: JsonGet,
    JsonPost: JsonPost,
    RawGet: RawGet,
    RawPost: RawPost
});

function getMessage({ domain, timestamp, }) {
    return `Xnode Auth authenticate ${domain} at ${timestamp}`;
}
function ipLogin() {
    return {};
}
function ethereumLogin({ address, timestamp, signature, }) {
    return {
        user: `ethereum:${address.replace("0x", "").toLowerCase()}`,
        signature,
        timestamp: timestamp.toString(),
    };
}
function passwordLogin({ username, timestamp, signature, }) {
    return {
        user: `password:${username}`,
        signature,
        timestamp: timestamp.toString(),
    };
}

var login = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ethereumLogin: ethereumLogin,
    getMessage: getMessage,
    ipLogin: ipLogin,
    passwordLogin: passwordLogin
});

function scope$d() {
    return "/host";
}

function scope$c() {
    return scope$d() + "/process";
}
async function logs$1(input) {
    return JsonGet(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/logs`);
}
async function status$1(input) {
    return JsonGet(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/status`);
}
async function usage$1(input) {
    return JsonGet(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/usage`);
}
async function start$1(input) {
    return RawPost(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/start`);
}
async function stop$1(input) {
    return RawPost(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/stop`);
}
async function restart$1(input) {
    return RawPost(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/restart`);
}
async function reload$1(input) {
    return RawPost(input, (path) => `${scope$c()}/${encodeURIComponent(path.process)}/reload`);
}

async function awaitCommand({ client, command, getStatus, pollInterval, }) {
    let _status;
    while (!_status || _status.running) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
        _status = await (getStatus ?? status$1)({
            client,
            path: { process: command.id },
        }).catch(() => undefined);
    }
}

var helpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    awaitCommand: awaitCommand
});

var index$g = /*#__PURE__*/Object.freeze({
    __proto__: null,
    bytes: bytes,
    client: client,
    helpers: helpers,
    login: login,
    rust_types: rustTypes
});

var command = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var file = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var info = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var nix = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var process$2 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var response = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var index$f = /*#__PURE__*/Object.freeze({
    __proto__: null,
    command: command,
    file: file,
    info: info,
    nix: nix,
    process: process$2,
    response: response,
    utils: index$g
});

function scope$b(path) {
    return `/container/${encodeURIComponent(path.container)}`;
}

function scope$a(path) {
    return scope$b(path) + "/config";
}
async function get$1(input) {
    return RawGet(input, (path) => `${scope$a(path)}/get`);
}
async function set$1(input) {
    return RawPost(input, (path) => `${scope$a(path)}/set`);
}
async function version$1(input) {
    return RawGet(input, (path) => `${scope$a(path)}/version`);
}
async function update$1(input) {
    return JsonPost(input, (path) => `${scope$a(path)}/update`);
}
async function build$1(input) {
    return JsonPost(input, (path) => `${scope$a(path)}/build`);
}
async function apply$1(input) {
    return JsonPost(input, (path) => `${scope$a(path)}/apply`);
}

var index$e = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply$1,
    build: build$1,
    get: get$1,
    scope: scope$a,
    set: set$1,
    update: update$1,
    version: version$1
});

function scope$9(path) {
    return scope$b(path) + "/file";
}
async function metadata$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/metadata`);
}
async function size$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/size`);
}
async function move$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/move`);
}
async function remove$2(input) {
    return RawPost(input, (path) => `${scope$9(path)}/remove`);
}
async function copy$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/copy`);
}
async function read_file$1(input) {
    return RawGet(input, (path) => `${scope$9(path)}/read_file`);
}
async function write_file$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/write_file`);
}
async function read_folder$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/read_folder`);
}
async function create_folder$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/create_folder`);
}
async function read_link$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/read_link`);
}
async function write_link$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/write_link`);
}
async function get_permissions$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/get_permissions`);
}
async function set_permissions$1(input) {
    return RawPost(input, (path) => `${scope$9(path)}/set_permissions`);
}

var index$d = /*#__PURE__*/Object.freeze({
    __proto__: null,
    copy: copy$1,
    create_folder: create_folder$1,
    get_permissions: get_permissions$1,
    metadata: metadata$1,
    move: move$1,
    read_file: read_file$1,
    read_folder: read_folder$1,
    read_link: read_link$1,
    remove: remove$2,
    scope: scope$9,
    set_permissions: set_permissions$1,
    size: size$1,
    write_file: write_file$1,
    write_link: write_link$1
});

function scope$8(path) {
    return scope$b(path) + "/info";
}
var users$1;
(function (users_1) {
    async function users(input) {
        return JsonGet(input, (path) => `${scope$8(path)}/users/users`);
    }
    users_1.users = users;
    async function groups(input) {
        return JsonGet(input, (path) => `${scope$8(path)}/users/groups`);
    }
    users_1.groups = groups;
})(users$1 || (users$1 = {}));

var index$c = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scope: scope$8,
    get users () { return users$1; }
});

function scope$7(path) {
    return scope$b(path) + "/list";
}
async function process$1(input) {
    return JsonGet(input, (path) => `${scope$7(path)}/process`);
}

var index$b = /*#__PURE__*/Object.freeze({
    __proto__: null,
    process: process$1,
    scope: scope$7
});

function scope$6(path) {
    return scope$b(path) + "/process";
}
async function logs(input) {
    return JsonGet(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/logs`);
}
async function status(input) {
    return JsonGet(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/status`);
}
async function usage(input) {
    return JsonGet(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/usage`);
}
async function start(input) {
    return RawPost(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/start`);
}
async function stop(input) {
    return RawPost(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/stop`);
}
async function restart(input) {
    return RawPost(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/restart`);
}
async function reload(input) {
    return RawPost(input, (path) => `${scope$6(path)}/${encodeURIComponent(path.process)}/reload`);
}

var index$a = /*#__PURE__*/Object.freeze({
    __proto__: null,
    logs: logs,
    reload: reload,
    restart: restart,
    scope: scope$6,
    start: start,
    status: status,
    stop: stop,
    usage: usage
});

async function create(input) {
    return RawPost(input, (path) => `${scope$b(path)}/create`);
}
async function remove$1(input) {
    return RawPost(input, (path) => `${scope$b(path)}/remove`);
}

var index$9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: index$e,
    create: create,
    file: index$d,
    info: index$c,
    list: index$b,
    process: index$a,
    remove: remove$1
});

function scope$5() {
    return scope$d() + "/config";
}
async function get(input) {
    return RawGet(input, `${scope$5()}/get`);
}
async function set(input) {
    return RawPost(input, `${scope$5()}/set`);
}
async function version(input) {
    return RawGet(input, `${scope$5()}/version`);
}
async function update(input) {
    return JsonPost(input, `${scope$5()}/update`);
}
async function build(input) {
    return JsonPost(input, `${scope$5()}/build`);
}
async function apply(input) {
    return JsonPost(input, `${scope$5()}/apply`);
}

var index$8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply,
    build: build,
    get: get,
    scope: scope$5,
    set: set,
    update: update,
    version: version
});

function scope$4() {
    return scope$d() + "/file";
}
async function metadata(input) {
    return JsonGet(input, `${scope$4()}/metadata`);
}
async function size(input) {
    return JsonGet(input, `${scope$4()}/size`);
}
async function move(input) {
    return RawPost(input, `${scope$4()}/move`);
}
async function remove(input) {
    return RawPost(input, `${scope$4()}/remove`);
}
async function copy(input) {
    return RawPost(input, `${scope$4()}/copy`);
}
async function read_file(input) {
    return RawGet(input, `${scope$4()}/read_file`);
}
async function write_file(input) {
    return RawPost(input, `${scope$4()}/write_file`);
}
async function read_folder(input) {
    return JsonGet(input, `${scope$4()}/read_folder`);
}
async function create_folder(input) {
    return RawPost(input, `${scope$4()}/create_folder`);
}
async function read_link(input) {
    return JsonGet(input, `${scope$4()}/read_link`);
}
async function write_link(input) {
    return RawPost(input, `${scope$4()}/write_link`);
}
async function get_permissions(input) {
    return JsonGet(input, `${scope$4()}/get_permissions`);
}
async function set_permissions(input) {
    return RawPost(input, `${scope$4()}/set_permissions`);
}

var index$7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    copy: copy,
    create_folder: create_folder,
    get_permissions: get_permissions,
    metadata: metadata,
    move: move,
    read_file: read_file,
    read_folder: read_folder,
    read_link: read_link,
    remove: remove,
    scope: scope$4,
    set_permissions: set_permissions,
    size: size,
    write_file: write_file,
    write_link: write_link
});

function scope$3() {
    return scope$d() + "/info";
}
var flake;
(function (flake) {
    async function metadata(input) {
        return JsonGet(input, `${scope$3()}/flake/metadata`);
    }
    flake.metadata = metadata;
})(flake || (flake = {}));
async function _eval(input) {
    return JsonGet(input, `${scope$3()}/eval`);
}
var users;
(function (users_1) {
    async function users(input) {
        return JsonGet(input, `${scope$3()}/users/users`);
    }
    users_1.users = users;
    async function groups(input) {
        return JsonGet(input, `${scope$3()}/users/groups`);
    }
    users_1.groups = groups;
})(users || (users = {}));

var index$6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    eval: _eval,
    get flake () { return flake; },
    scope: scope$3,
    get users () { return users; }
});

function scope$2() {
    return scope$d() + "/list";
}
async function process(input) {
    return JsonGet(input, `${scope$2()}/process`);
}
async function container(input) {
    return JsonGet(input, `${scope$2()}/container`);
}

var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    container: container,
    process: process,
    scope: scope$2
});

function scope$1() {
    return scope$d() + "/power";
}
async function off(input) {
    return RawPost(input, `${scope$1()}/off`);
}
async function reboot(input) {
    return RawPost(input, `${scope$1()}/reboot`);
}

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    off: off,
    reboot: reboot,
    scope: scope$1
});

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    logs: logs$1,
    reload: reload$1,
    restart: restart$1,
    scope: scope$c,
    start: start$1,
    status: status$1,
    stop: stop$1,
    usage: usage$1
});

function scope() {
    return scope$d() + "/usage";
}
async function cpu(input) {
    return JsonGet(input, `${scope()}/cpu`);
}
async function memory(input) {
    return JsonGet(input, `${scope()}/memory`);
}
async function disk(input) {
    return JsonGet(input, `${scope()}/disk`);
}
async function network(input) {
    return JsonGet(input, `${scope()}/network`);
}
async function gpu(input) {
    return JsonGet(input, `${scope()}/gpu`);
}

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cpu: cpu,
    disk: disk,
    gpu: gpu,
    memory: memory,
    network: network,
    scope: scope
});

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: index$8,
    file: index$7,
    info: index$6,
    list: index$5,
    power: index$4,
    process: index$3,
    usage: index$2
});

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: index$f,
    container: index$9,
    host: index$1
});

export { index as xnode };
