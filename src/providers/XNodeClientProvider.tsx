import { createContext, useContext, type ReactNode } from "react";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

type Client = xnode.common.utils.client.Client;
type Login = xnode.common.utils.login.Login;

const DEFAULT_BASE_URL = "https://manager.xnode.local";

export type XNodeClientConfig = {
  baseUrl?: string;
  login?: Login;
};

export type XNodeClientContextValue = {
  config: XNodeClientConfig;
  client: Client;
};

export const XNodeClientContext = createContext<XNodeClientContextValue | null>(null);

export function XNodeClientProvider({
  children,
  config = {},
}: {
  children: ReactNode;
  config?: XNodeClientConfig;
}) {
  const baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
  const login = config.login ?? xnode.common.utils.login.ipLogin();

  const client: Client = {
    baseUrl,
    login,
  };

  return (
    <XNodeClientContext.Provider value={{ config: { baseUrl, login }, client }}>
      {children}
    </XNodeClientContext.Provider>
  );
}

export function useXNodeClient(): Client {
  const context = useContext(XNodeClientContext);
  if (!context) {
    throw new Error("useXNodeClient must be used within an XNodeClientProvider");
  }
  return context.client;
}

export function useXNodeClientConfig(): XNodeClientConfig {
  const context = useContext(XNodeClientContext);
  if (!context) {
    throw new Error("useXNodeClientConfig must be used within an XNodeClientProvider");
  }
  return context.config;
}
