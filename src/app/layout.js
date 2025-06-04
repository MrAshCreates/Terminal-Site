"use client";
import '../styles/globals.css';
import { useState, useEffect, createContext } from 'react';
export const ThemeContext = createContext();
export const runtime = "edge";
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const r = document.documentElement;
    r.classList.remove(theme === 'dark' ? 'light' : 'dark');
    r.classList.add(theme);
  }, [theme]);

  return (
    <html lang="en">
      <body>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}