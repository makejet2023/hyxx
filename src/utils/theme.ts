export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeType = typeof Theme[keyof typeof Theme];

export function getStoredTheme(): ThemeType {
  if (typeof window === 'undefined') {
    return Theme.LIGHT;
  }

  const storedTheme = localStorage.getItem('theme') as ThemeType;
  if (storedTheme && (storedTheme === Theme.LIGHT || storedTheme === Theme.DARK)) {
    return storedTheme;
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  }

  return Theme.LIGHT;
}

export function setTheme(theme: ThemeType) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('theme', theme);
  document.documentElement.classList.remove(Theme.LIGHT, Theme.DARK);
  document.documentElement.classList.add(theme);
} 