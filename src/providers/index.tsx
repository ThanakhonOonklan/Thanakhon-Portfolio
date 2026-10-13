'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { LocaleProvider } from './LocaleProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export { useLocaleContext } from './LocaleProvider';
export { ThemeProvider } from './ThemeProvider';
export { SmoothScrollProvider } from './SmoothScrollProvider';
export { LocaleProvider } from './LocaleProvider';
