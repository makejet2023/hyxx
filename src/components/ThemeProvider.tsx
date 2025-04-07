'use client';

import { useEffect } from 'react';
import { getStoredTheme, setTheme } from '@/utils/theme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const theme = getStoredTheme();
    setTheme(theme);
  }, []);

  return <>{children}</>;
} 