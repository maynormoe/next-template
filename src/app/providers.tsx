import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

import QueryProvider from './providers/QueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider enableSystem attribute="class">
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
