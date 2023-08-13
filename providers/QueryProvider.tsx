"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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
