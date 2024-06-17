// In Next.js, this file would be called: app/providers.jsx
'use client';

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { ReactNode } from 'react';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        // 在SSR环境中，我们通常希望设置一个大于0的默认staleTime，以避免客户端立即重新获取数据
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    // 服务器端：总是创建一个新的QueryClient
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    // 浏览器端：如果没有现成的QueryClient则创建一个新的
    // 这非常重要，以防React在初始渲染期间挂起时重新创建客户端
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProviders({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  // 注意：如果在没有挂起边界的情况下初始化query client，请避免使用useState
  // 因为如果没有边界，React会在初始渲染时丢弃客户端
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
