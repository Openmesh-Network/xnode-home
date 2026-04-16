import { isBytes, type Bytes } from "./bytes.js";
import type { Login } from "./login.js";

export type Client = {
  login: Login;
  baseUrl: string;
};

export type WithClient<T> = { client: Client } & T;

export type QueryValue = string | number | boolean | null | undefined;
export type QueryBase = Record<string, QueryValue>;
function queryString<Query extends QueryBase>(query: Query): string {
  const out: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
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

function getUrl<Path, Query extends QueryBase | undefined>({
  input,
  path,
}: {
  input: WithClient<{ path?: Path; query?: Query }>;
  path: Path extends Object ? (path: Path) => string : string;
}): string {
  return `${input.client.baseUrl}${input.path !== undefined && typeof path !== "string" ? path(input.path) : path}${input.query !== undefined ? queryString(input.query) : ""}`;
}

function loginArgs({ login }: { login: Login }) {
  const headers: Record<string, string> = {};

  if (login.user) headers["Xnode-Auth-User"] = login.user;
  if (login.signature) headers["Xnode-Auth-Signature"] = login.signature;
  if (login.timestamp) headers["Xnode-Auth-Timestamp"] = login.timestamp;

  return { headers } as const;
}

export async function JsonGet<
  Output extends Object,
  Path,
  Query extends QueryBase | undefined,
>(
  input: WithClient<{ path?: Path; query?: Query }>,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Output> {
  return fetch(
    getUrl({ input, path }),
    loginArgs({ login: input.client.login })
  ).then((res) => res.json());
}

export async function RawGet<Path, Query extends QueryBase | undefined>(
  input: WithClient<{ path?: Path; query?: Query }>,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Uint8Array<ArrayBuffer>> {
  return fetch(
    getUrl({ input, path }),
    loginArgs({ login: input.client.login })
  ).then((res) => res.bytes());
}

function postArgs<Data>({
  login,
  data,
}: {
  login: Login;
  data?: Data extends Bytes ? Bytes : Object;
}) {
  const baseArgs = loginArgs({ login });
  const headers = baseArgs.headers;

  if (data !== undefined && !isBytes(data)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    method: "POST",
    body:
      data === undefined
        ? undefined
        : isBytes(data)
          ? data
          : JSON.stringify(data),
    headers,
  } as const;
}

export async function JsonPost<
  Output extends Object,
  Path,
  Query extends QueryBase | undefined,
  Data,
>(
  input: WithClient<{
    path?: Path;
    query?: Query;
    data?: Data extends Bytes ? Bytes : Object;
  }>,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Output> {
  return fetch(
    getUrl({ input, path }),
    postArgs({ login: input.client.login, data: input.data })
  ).then((res) => res.json());
}

export async function RawPost<Path, Query extends QueryBase | undefined, Data>(
  input: WithClient<{
    path?: Path;
    query?: Query;
    data?: Data extends Bytes ? Bytes : Object;
  }>,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Bytes> {
  return fetch(
    getUrl({ input, path }),
    postArgs({ login: input.client.login, data: input.data })
  ).then((res) => res.bytes());
}
