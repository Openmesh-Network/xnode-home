import { QueryClient, QueryClientProvider, type QueryClientConfig } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

export function ReactQueryProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: QueryClientConfig;
}) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
