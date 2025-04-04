import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // const [isDark, setIsDark] = useLocalStorageState(false, 'isDarkMode');

  // match theme state based on operating system
  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    const rootElement = document.documentElement;

    if (isDark) {
      rootElement.classList.add('dark');
      rootElement.classList.remove('light');
    } else {
      rootElement.classList.remove('dark');
      rootElement.classList.add('light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(dark => !dark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>{children}</ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
