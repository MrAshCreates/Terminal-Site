import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';
export default function TitleBar({ title, onClose, onMinimize, onMaximize }) {
  const { theme, setTheme } = useContext(ThemeContext);
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