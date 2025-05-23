import '../styles/globals.css';
import { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}