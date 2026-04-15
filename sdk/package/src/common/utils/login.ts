export type Login = {
  user?: string;
  signature?: string;
  timestamp?: string;
};

export function getMessage({
  domain,
  timestamp,
}: {
  domain: string;
  timestamp: number;
}): string {
  return `Xnode Auth authenticate ${domain} at ${timestamp}`;
}

export function ipLogin(): Login {
  return {};
}

export function ethereumLogin({
  address,
  timestamp,
  signature,
}: {
  address: `0x${string}`;
  timestamp: number;
  signature: `0x${string}`;
}): Login {
  return {
    user: `ethereum:${address.replace("0x", "").toLowerCase()}`,
    signature,
    timestamp: timestamp.toString(),
  };
}

export function passwordLogin({
  username,
  timestamp,
  signature,
}: {
  username: `0x${string}`;
  timestamp: number;
  signature: `0x${string}`;
}): Login {
  return {
    user: `password:${username}`,
    signature,
    timestamp: timestamp.toString(),
  };
}
