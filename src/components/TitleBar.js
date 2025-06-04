"use client";
import { useContext } from 'react';
import { ThemeContext } from '../app/layout';
export default function TitleBar({ title, onClose, onMinimize, onMaximize }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleMinimize = () => {
    const app = document.getElementById('app-container');
    if (app) app.style.display = 'none';
    setTimeout(() => {
    if (app) app.style.display = 'block';
    }, 1000); // simulate minimize
    };
    
    const handleMaximize = () => {
    const win = document.querySelector('.window');
    if (win.classList.contains('maximized')) {
    win.classList.remove('maximized');
    win.style.width = '80%';
    win.style.height = '80vh';
    } else {
    win.classList.add('maximized');
    win.style.width = '100%';
    win.style.height = '100vh';
    }
    };
    
  return (
    <div className="menu">
      <div className="button red" onClick={onClose}/>
      <div className="button yellow" onClick={onMinimize}/>
      <div className="button green" onClick={onMaximize}/>
      <div className="title">{title}</div>
      <button className="ml-auto px-2 text-xs bg-gray-700 bg-opacity-30 rounded" onClick={() => setTheme(theme==='dark'?'light':'dark')}>
        {theme==='dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}