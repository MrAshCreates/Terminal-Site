import { useState, useEffect, useRef } from 'react';
import { fetchRepos } from '../utils/github';

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const history = useRef([]);
  const idx = useRef(0);
  const termRef = useRef();

  useEffect(() => {
    write('Welcome to my CLI portfolio! Type `help` for commands.');
    scroll();
  }, []);

  const write = (text) => setLines((l) => [...l, text]);
  const scroll = () => setTimeout(() => termRef.current.scrollTop = termRef.current.scrollHeight, 50);

  const handle = async (cmd) => {
    write(`$ ${cmd}`);
    switch (cmd) {
      case 'help':
        ['help — list commands',
         'projects — show GitHub repos',
         'skills — list my tech stack',
         'resume — open my resume',
         'login — secure login',
         'theme — toggle light/dark',
         'clear — clear screen'].forEach(write);
        break;
      case 'projects':
        write('Fetching repos…');
        try {
          const repos = await fetchRepos();
          repos.slice(0, 5).forEach(r => write(`• ${r.name}: ${r.html_url}`));
        } catch {
          write('Failed to load repos');
        }
        break;
      case 'skills':
        ['JavaScript, TypeScript, Python, Rust',
         'React, Next.js, Tailwind CSS',
         'Docker, Git, Linux'].forEach(write);
        break;
      case 'resume':
        write('Opening resume…');
        window.open('/Resume.pdf', '_blank');
        break;
      case 'login':
        write('Redirecting to login…');
        window.location.href = '/api/login';
        break;
      case 'theme':
        write('Use titlebar button to toggle theme');
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        write(`command not found: ${cmd}`);
    }
    scroll();
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      history.current.push(cmd);
      idx.current = history.current.length;
      setInput('');
      handle(cmd);
    } else if (e.key === 'ArrowUp') {
      idx.current = Math.max(0, idx.current - 1);
      setInput(history.current[idx.current] || '');
    } else if (e.key === 'ArrowDown') {
      idx.current = Math.min(history.current.length, idx.current + 1);
      setInput(history.current[idx.current] || '');
    }
  };

  return (
    <div ref={termRef} id="app">
      {lines.map((l,i) => <pre key={i}>{l}</pre>)}
      <div className="flex items-center">
        <span className="text-green-400">$</span>
        <input
          className="bg-transparent flex-1 ml-2 focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
        />
      </div>
    </div>
  );
}