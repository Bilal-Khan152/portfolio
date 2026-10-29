'use client';

import { Toaster } from 'sonner';
import { useTheme } from './theme';

/**
 * Site-wide toasts (Sonner). Top-right, rich colors (green success, red
 * error), themed from the site's own theme so both modes look right.
 */
export default function AppToaster() {
  const { theme } = useTheme();
  return <Toaster position="top-right" theme={theme} richColors closeButton />;
}
