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

function scope$k() {
    return "/host";
}

function scope$j(path) {
    return `${scope$k()}/process/${encodeURIComponent(path.process)}`;
}

async function process$2(input) {
    return JsonGet(input, `${scope$k()}/process`);
}
async function info$5(input) {
    return JsonGet(input, (path) => `${scope$j(path)}/info`);
}
async function status$1(input) {
    return JsonGet(input, (path) => `${scope$j(path)}/status`);
}
async function logs$1(input) {
    return JsonGet(input, (path) => `${scope$j(path)}/logs`);
}
async function usage$6(input) {
    return JsonGet(input, (path) => `${scope$j(path)}/usage`);
}
async function start$1(input) {
    return RawPost(input, (path) => `${scope$j(path)}/start`);
}
async function stop$1(input) {
    return RawPost(input, (path) => `${scope$j(path)}/stop`);
}
async function restart$1(input) {
    return RawPost(input, (path) => `${scope$j(path)}/restart`);
}
async function reload$1(input) {
    return RawPost(input, (path) => `${scope$j(path)}/reload`);
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

var index$n = /*#__PURE__*/Object.freeze({
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

var info$4 = /*#__PURE__*/Object.freeze({
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

var index$m = /*#__PURE__*/Object.freeze({
    __proto__: null,
    command: command,
    file: file,
    info: info$4,
    nix: nix,
    process: process$1,
    response: response,
    utils: index$n
});

function scope$i(path) {
    return `/container/${encodeURIComponent(path.container)}`;
}

function scope$h(path) {
    return `${scope$i(path)}/config`;
}

async function get$3(input) {
    return RawGet(input, (path) => `${scope$h(path)}/get`);
}
async function set$3(input) {
    return RawPost(input, (path) => `${scope$h(path)}/set`);
}
async function version$1(input) {
    return RawGet(input, (path) => `${scope$h(path)}/version`);
}
async function update$1(input) {
    return JsonPost(input, (path) => `${scope$h(path)}/update`);
}
async function build$1(input) {
    return JsonPost(input, (path) => `${scope$h(path)}/build`);
}
async function apply$1(input) {
    return JsonPost(input, (path) => `${scope$h(path)}/apply`);
}

var index$l = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply$1,
    build: build$1,
    get: get$3,
    scope: scope$h,
    set: set$3,
    update: update$1,
    version: version$1
});

function scope$g(path) {
    return `${scope$i(path)}/file`;
}

async function metadata$1(input) {
    return JsonGet(input, (path) => `${scope$g(path)}/metadata`);
}
async function size$1(input) {
    return JsonGet(input, (path) => `${scope$g(path)}/size`);
}
async function move$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/move`);
}
async function remove$2(input) {
    return RawPost(input, (path) => `${scope$g(path)}/remove`);
}
async function copy$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/copy`);
}
async function read_file$1(input) {
    return RawGet(input, (path) => `${scope$g(path)}/read_file`);
}
async function write_file$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/write_file`);
}
async function read_folder$1(input) {
    return JsonGet(input, (path) => `${scope$g(path)}/read_folder`);
}
async function create_folder$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/create_folder`);
}
async function read_link$1(input) {
    return JsonGet(input, (path) => `${scope$g(path)}/read_link`);
}
async function write_link$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/write_link`);
}
async function get_permissions$1(input) {
    return JsonGet(input, (path) => `${scope$g(path)}/get_permissions`);
}
async function set_permissions$1(input) {
    return RawPost(input, (path) => `${scope$g(path)}/set_permissions`);
}

var index$k = /*#__PURE__*/Object.freeze({
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
    scope: scope$g,
    set_permissions: set_permissions$1,
    size: size$1,
    write_file: write_file$1,
    write_link: write_link$1
});

function scope$f(path) {
    return `${scope$i(path)}/info`;
}

var flake$1;
(function (flake) {
    async function metadata(input) {
        return JsonGet(input, (path) => `${scope$f(path)}/flake/metadata`);
    }
    flake.metadata = metadata;
})(flake$1 || (flake$1 = {}));
async function _eval$1(input) {
    return JsonGet(input, (path) => `${scope$f(path)}/eval`);
}
var users$1;
(function (users_1) {
    async function users(input) {
        return JsonGet(input, (path) => `${scope$f(path)}/users/users`);
    }
    users_1.users = users;
    async function groups(input) {
        return JsonGet(input, (path) => `${scope$f(path)}/users/groups`);
    }
    users_1.groups = groups;
})(users$1 || (users$1 = {}));

var index$j = /*#__PURE__*/Object.freeze({
    __proto__: null,
    eval: _eval$1,
    get flake () { return flake$1; },
    scope: scope$f,
    get users () { return users$1; }
});

function scope$e(path) {
    return `${scope$i(path)}/process/${encodeURIComponent(path.process)}`;
}

async function process(input) {
    return JsonGet(input, (path) => `${scope$i(path)}/process`);
}
async function info$3(input) {
    return JsonGet(input, (path) => `${scope$e(path)}/info`);
}
async function status(input) {
    return JsonGet(input, (path) => `${scope$e(path)}/status`);
}
async function logs(input) {
    return JsonGet(input, (path) => `${scope$e(path)}/logs`);
}
async function usage$5(input) {
    return JsonGet(input, (path) => `${scope$e(path)}/usage`);
}
async function start(input) {
    return RawPost(input, (path) => `${scope$e(path)}/start`);
}
async function stop(input) {
    return RawPost(input, (path) => `${scope$e(path)}/stop`);
}
async function restart(input) {
    return RawPost(input, (path) => `${scope$e(path)}/restart`);
}
async function reload(input) {
    return RawPost(input, (path) => `${scope$e(path)}/reload`);
}

var index$i = /*#__PURE__*/Object.freeze({
    __proto__: null,
    info: info$3,
    logs: logs,
    process: process,
    reload: reload,
    restart: restart,
    scope: scope$e,
    start: start,
    status: status,
    stop: stop,
    usage: usage$5
});

async function container(input) {
    return JsonGet(input, "/container");
}
async function create(input) {
    return RawPost(input, (path) => `${scope$i(path)}/create`);
}
async function remove$1(input) {
    return RawPost(input, (path) => `${scope$i(path)}/remove`);
}

var index$h = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: index$l,
    container: container,
    create: create,
    file: index$k,
    info: index$j,
    process: index$i,
    remove: remove$1,
    scope: scope$i
});

function scope$d() {
    return `${scope$k()}/config`;
}

async function get$2(input) {
    return RawGet(input, `${scope$d()}/get`);
}
async function set$2(input) {
    return RawPost(input, `${scope$d()}/set`);
}
async function version(input) {
    return RawGet(input, `${scope$d()}/version`);
}
async function update(input) {
    return JsonPost(input, `${scope$d()}/update`);
}
async function build(input) {
    return JsonPost(input, `${scope$d()}/build`);
}
async function apply(input) {
    return JsonPost(input, `${scope$d()}/apply`);
}

var index$g = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply,
    build: build,
    get: get$2,
    scope: scope$d,
    set: set$2,
    update: update,
    version: version
});

function scope$c() {
    return `${scope$k()}/file`;
}

async function metadata(input) {
    return JsonGet(input, `${scope$c()}/metadata`);
}
async function size(input) {
    return JsonGet(input, `${scope$c()}/size`);
}
async function move(input) {
    return RawPost(input, `${scope$c()}/move`);
}
async function remove(input) {
    return RawPost(input, `${scope$c()}/remove`);
}
async function copy(input) {
    return RawPost(input, `${scope$c()}/copy`);
}
async function read_file(input) {
    return RawGet(input, `${scope$c()}/read_file`);
}
async function write_file(input) {
    return RawPost(input, `${scope$c()}/write_file`);
}
async function read_folder(input) {
    return JsonGet(input, `${scope$c()}/read_folder`);
}
async function create_folder(input) {
    return RawPost(input, `${scope$c()}/create_folder`);
}
async function read_link(input) {
    return JsonGet(input, `${scope$c()}/read_link`);
}
async function write_link(input) {
    return RawPost(input, `${scope$c()}/write_link`);
}
async function get_permissions(input) {
    return JsonGet(input, `${scope$c()}/get_permissions`);
}
async function set_permissions(input) {
    return RawPost(input, `${scope$c()}/set_permissions`);
}

var index$f = /*#__PURE__*/Object.freeze({
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
    scope: scope$c,
    set_permissions: set_permissions,
    size: size,
    write_file: write_file,
    write_link: write_link
});

function scope$b() {
    return `${scope$k()}/info`;
}

var flake;
(function (flake) {
    async function metadata(input) {
        return JsonGet(input, `${scope$b()}/flake/metadata`);
    }
    flake.metadata = metadata;
})(flake || (flake = {}));
async function _eval(input) {
    return JsonGet(input, `${scope$b()}/eval`);
}
var users;
(function (users_1) {
    async function users(input) {
        return JsonGet(input, `${scope$b()}/users/users`);
    }
    users_1.users = users;
    async function groups(input) {
        return JsonGet(input, `${scope$b()}/users/groups`);
    }
    users_1.groups = groups;
})(users || (users = {}));

var index$e = /*#__PURE__*/Object.freeze({
    __proto__: null,
    eval: _eval,
    get flake () { return flake; },
    scope: scope$b,
    get users () { return users; }
});

function scope$a() {
    return `${scope$k()}/permission`;
}

function scope$9(path) {
    return `${scope$a()}/container/${path.container}`;
}

async function get$1(input) {
    return JsonGet(input, (path) => `${scope$9(path)}/get`);
}
async function set$1(input) {
    return JsonPost(input, (path) => `${scope$9(path)}/set`);
}

var index$d = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get$1,
    scope: scope$9,
    set: set$1
});

function scope$8(path) {
    return `${scope$a()}/virtual-machine/${path.virtual_machine}`;
}

async function get(input) {
    return JsonGet(input, (path) => `${scope$8(path)}/get`);
}
async function set(input) {
    return JsonPost(input, (path) => `${scope$8(path)}/set`);
}

var index$c = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    scope: scope$8,
    set: set
});

var index$b = /*#__PURE__*/Object.freeze({
    __proto__: null,
    container: index$d,
    scope: scope$a,
    virtual_machine: index$c
});

function scope$7() {
    return `${scope$k()}/power`;
}

async function off(input) {
    return RawPost(input, `${scope$7()}/off`);
}
async function reboot(input) {
    return RawPost(input, `${scope$7()}/reboot`);
}

var index$a = /*#__PURE__*/Object.freeze({
    __proto__: null,
    off: off,
    reboot: reboot,
    scope: scope$7
});

var index$9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    info: info$5,
    logs: logs$1,
    process: process$2,
    reload: reload$1,
    restart: restart$1,
    scope: scope$j,
    start: start$1,
    status: status$1,
    stop: stop$1,
    usage: usage$6
});

function scope$6() {
    return `${scope$k()}/hardware`;
}

function scope$5(path) {
    return `${scope$6()}/cpu/${path.cpu}`;
}

async function cpu(input) {
    return JsonGet(input, `${scope$6()}/cpu`);
}
async function info$2(input) {
    return JsonGet(input, (path) => `${scope$5(path)}/info`);
}
async function usage$4(input) {
    return JsonGet(input, (path) => `${scope$5(path)}/usage`);
}

var index$8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cpu: cpu,
    info: info$2,
    scope: scope$5,
    usage: usage$4
});

function scope$4(path) {
    return `${scope$6()}/disk/${path.disk}`;
}

async function disk(input) {
    return JsonGet(input, `${scope$6()}/disk`);
}
async function usage$3(input) {
    return JsonGet(input, (path) => `${scope$4(path)}/usage`);
}

var index$7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    disk: disk,
    scope: scope$4,
    usage: usage$3
});

function scope$3() {
    return `${scope$6()}/gpu`;
}

function scope$2(path) {
    return `${scope$3()}/nvidia/${path.gpu}`;
}

async function nvidia(input) {
    return JsonGet(input, `${scope$3()}/nvidia`);
}
async function info$1(input) {
    return JsonGet(input, (path) => `${scope$2(path)}/info`);
}
async function usage$2(input) {
    return JsonGet(input, (path) => `${scope$2(path)}/usage`);
}

var index$6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    info: info$1,
    nvidia: nvidia,
    scope: scope$2,
    usage: usage$2
});

var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    nvidia: index$6,
    scope: scope$3
});

function scope$1() {
    return `${scope$6()}/memory`;
}

async function usage$1(input) {
    return JsonGet(input, `${scope$1()}/usage`);
}

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scope: scope$1,
    usage: usage$1
});

function scope(path) {
    return `${scope$6()}/network/${path.network}`;
}

async function network(input) {
    return JsonGet(input, `${scope$6()}/network`);
}
async function info(input) {
    return JsonGet(input, (path) => `${scope(path)}/info`);
}
async function usage(input) {
    return JsonGet(input, (path) => `${scope(path)}/usage`);
}

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    info: info,
    network: network,
    scope: scope,
    usage: usage
});

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cpu: index$8,
    disk: index$7,
    gpu: index$5,
    memory: index$4,
    network: index$3,
    scope: scope$6
});

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: index$g,
    file: index$f,
    hardware: index$2,
    info: index$e,
    permission: index$b,
    power: index$a,
    process: index$9,
    scope: scope$k
});

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: index$m,
    container: index$h,
    host: index$1
});

export { index as xnode };
