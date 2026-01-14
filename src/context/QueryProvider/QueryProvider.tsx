"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Definisikan komponen Lazy di luar fungsi utama
const ReactQueryDevtools = React.lazy(() =>
  import("@tanstack/react-query-devtools").then((res) => ({
    default: res.ReactQueryDevtools,
  }))
);

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Inisialisasi QueryClient
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* 3. Render dengan Suspense hanya di mode development */}
      {process.env.NODE_ENV === "development" && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
