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

var index$a = /*#__PURE__*/Object.freeze({
    __proto__: null,
    bytes: bytes,
    client: client,
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

var process$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var response = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var index$9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    command: command,
    file: file,
    info: info,
    nix: nix,
    process: process$1,
    response: response,
    utils: index$a
});

function scope$8() {
    return "/host";
}

function scope$7() {
    return scope$8() + "/config";
}
async function get(input) {
    return RawGet(input, `${scope$7()}/get`);
}
async function set(input) {
    return RawPost(input, `${scope$7()}/set`);
}
async function version(input) {
    return RawGet(input, `${scope$7()}/version`);
}
async function update(input) {
    return JsonPost(input, `${scope$7()}/update`);
}
async function build(input) {
    return JsonPost(input, `${scope$7()}/build`);
}
async function apply(input) {
    return JsonPost(input, `${scope$7()}/apply`);
}

var index$8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply,
    build: build,
    get: get,
    scope: scope$7,
    set: set,
    update: update,
    version: version
});

function scope$6() {
    return scope$8() + "/file";
}
async function metadata(input) {
    return JsonGet(input, `${scope$6()}/metadata`);
}
async function size(input) {
    return JsonGet(input, `${scope$6()}/size`);
}
async function move(input) {
    return RawPost(input, `${scope$6()}/move`);
}
async function remove(input) {
    return RawPost(input, `${scope$6()}/remove`);
}
async function copy(input) {
    return RawPost(input, `${scope$6()}/copy`);
}
async function read_file(input) {
    return RawGet(input, `${scope$6()}/read_file`);
}
async function write_file(input) {
    return RawPost(input, `${scope$6()}/write_file`);
}
async function read_folder(input) {
    return JsonGet(input, `${scope$6()}/read_folder`);
}
async function create_folder(input) {
    return RawPost(input, `${scope$6()}/create_folder`);
}
async function read_link(input) {
    return JsonGet(input, `${scope$6()}/read_link`);
}
async function get_permissions(input) {
    return JsonGet(input, `${scope$6()}/get_permissions`);
}
async function set_permissions(input) {
    return RawPost(input, `${scope$6()}/set_permissions`);
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
    scope: scope$6,
    set_permissions: set_permissions,
    size: size,
    write_file: write_file
});

function scope$5() {
    return scope$8() + "/info";
}
var flake;
(function (flake) {
    async function metadata(input) {
        return JsonGet(input, `${scope$5()}/flake/metadata`);
    }
    flake.metadata = metadata;
})(flake || (flake = {}));
async function _eval(input) {
    return JsonGet(input, `${scope$5()}/eval`);
}
var users;
(function (users_1) {
    async function users(input) {
        return JsonGet(input, `${scope$5()}/users/users`);
    }
    users_1.users = users;
    async function groups(input) {
        return JsonGet(input, `${scope$5()}/users/groups`);
    }
    users_1.groups = groups;
})(users || (users = {}));

var index$6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    eval: _eval,
    get flake () { return flake; },
    scope: scope$5,
    get users () { return users; }
});

function scope$4() {
    return scope$8() + "/list";
}
async function process(input) {
    return JsonGet(input, `${scope$4()}/process`);
}
async function container(input) {
    return JsonGet(input, `${scope$4()}/container`);
}

var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    container: container,
    process: process,
    scope: scope$4
});

function scope$3() {
    return scope$8() + "/power";
}
async function off(input) {
    return RawPost(input, `${scope$3()}/off`);
}
async function reboot(input) {
    return RawPost(input, `${scope$3()}/reboot`);
}

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    off: off,
    reboot: reboot,
    scope: scope$3
});

function scope$2() {
    return scope$8() + "/process";
}
async function logs(input) {
    return JsonGet(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/logs`);
}
async function status(input) {
    return JsonGet(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/status`);
}
async function usage(input) {
    return JsonGet(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/usage`);
}
async function start(input) {
    return RawPost(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/start`);
}
async function stop(input) {
    return RawPost(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/stop`);
}
async function restart(input) {
    return RawPost(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/restart`);
}
async function reload(input) {
    return RawPost(input, (path) => `${scope$2()}/${encodeURIComponent(path.process)}/reload`);
}

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    logs: logs,
    reload: reload,
    restart: restart,
    scope: scope$2,
    start: start,
    status: status,
    stop: stop,
    usage: usage
});

function scope$1() {
    return scope$8() + "/usage";
}
async function cpu(input) {
    return JsonGet(input, `${scope$1()}/cpu`);
}
async function memory(input) {
    return JsonGet(input, `${scope$1()}/memory`);
}
async function disk(input) {
    return JsonGet(input, `${scope$1()}/disk`);
}
async function network(input) {
    return JsonGet(input, `${scope$1()}/network`);
}
async function gpu(input) {
    return JsonGet(input, `${scope$1()}/gpu`);
}

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cpu: cpu,
    disk: disk,
    gpu: gpu,
    memory: memory,
    network: network,
    scope: scope$1
});

function scope() {
    return "/host";
}

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: index$8,
    file: index$7,
    info: index$6,
    list: index$5,
    power: index$4,
    process: index$3,
    scope: scope,
    usage: index$2
});

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: index$9,
    host: index$1
});

export { index as xnode };
