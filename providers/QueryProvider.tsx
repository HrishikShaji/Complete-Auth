"use client";
import { queryClientOptions } from "@/libs/queryClientOptions";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface ProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: ProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
