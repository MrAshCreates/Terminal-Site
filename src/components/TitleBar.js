import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

export default function TitleBar({ title, onClose, onMinimize, onMaximize }) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="menu">
      <div className="button red" onClick={onClose} title="Close" />
      <div className="button yellow" onClick={onMinimize} title="Minimize" />
      <div className="button green" onClick={onMaximize} title="Maximize" />
      <div className="title">{title}</div>
      <button
        className="ml-auto px-2 text-xs bg-gray-700 bg-opacity-30 rounded"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}