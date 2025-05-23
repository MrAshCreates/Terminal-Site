import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { fetchRepos } from '../utils/github';

export default function Terminal() {
  const [lines,setLines]=useState([]),[input,setInput]=useState('');
  const hist=useRef([]), idx=useRef(0), {theme} = useContext(ThemeContext);
  const termRef=useRef();
  const [user, setUser] = useState(null);

  useEffect(()=>{ 
    addLine(`Welcome to my CLI portfolio — ${theme} mode`); 
    addLine('Type `help` for commands'); 
    scroll(); 
  },[theme]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/me', { cache: 'no-store' });
        const data = await res.json();
        if (data.loggedIn) {
          setUser(data.email);
          addLine(`✅ Logged in as ${data.email}`);
          addLine(`Try 'secret' or 'admin' 😉`);
        }
      } catch (e) {
        setUser(null);
      }
    };
  
    checkLogin();
  
    // Check again after 5s in case login just happened
    const interval = setInterval(checkLogin, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLine=(text,html=false)=> setLines(l=>[...l,{text,html}]);
  const scroll=()=>setTimeout(()=>termRef.current.scrollTop=termRef.current.scrollHeight,50);
  const handle = async (inputCmd) => {
    addLine(`$ ${inputCmd}`);
    const [command, ...args] = inputCmd.trim().split(' ');
    const argString = args.join(' ');
  
    switch (command) {
      case 'help':
        [
          'help — list commands',
          'projects — show repos',
          'fry ends — view friends',
          'resume — open resume',
          'login — secure login',
          'alert — send message to Discord',
          'clear — clear screen'
        ].forEach(t => addLine(t));
        break;
  
      case 'projects':
        addLine('Loading repos…');
        try {
          (await fetchRepos()).slice(0, 5).forEach(r => addLine(`• ${r.name}: ${r.html_url}`));
        } catch {
          addLine('Error loading repos');
        }
        break;
  
      case 'fry':
        if (args[0] === 'ends') {
          addLine('╭──────────┬────────────────────┮');
          addLine('│ Name     │ Profile URL        │');
          addLine('├──────────┼────────────────────┤');
          addLine(`<span class="cli-link" onclick="window.open('/fryends/ash','_blank')">│ Ash      │ /fryends/ash       │</span>`, true);
          addLine(`<span class="cli-link" onclick="window.open('/fryends/danny','_blank')">│ Danny    │ /fryends/danny     │</span>`, true);
          addLine(`<span class="cli-link" onclick="window.open('/fryends/kailynn','_blank')">│ Kailynn  │ /fryends/kailynn   │</span>`, true);
          addLine('╰──────────┴────────────────────╯');
        } else {
          addLine(`command not found: ${inputCmd}`);
        }
        break;
  
      case 'resume':
        addLine('Opening resume…');
        window.open('/Resume.pdf', '_blank');
        break;
  
      case 'alert':
        if (!argString) return addLine('Usage: alert <your message>');
        addLine('📤 Sending alert...');
        try {
          const res = await fetch('/api/alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: argString })
          });
          const data = await res.json();
          if (data.success) addLine('✅ Alert sent to Discord!');
          else throw new Error();
        } catch {
          addLine('❌ Failed to send alert.');
        }
        break;
  
        case 'login': {
          const email = prompt("📧 Enter your email to receive a magic login link:");
          if (!email) {
            addLine("Login cancelled.");
            break;
          }
        
          addLine("📤 Sending magic login link...");
          try {
            const res = await fetch('/api/magic-link', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
        
            const data = await res.json();
            if (data.success) {
              addLine("✅ Magic link sent! Check your inbox.");
            } else {
              addLine("❌ Failed to send link.");
            }
          } catch (err) {
            console.error('[login error]', err);
            addLine("❌ An error occurred.");
          }
        
          break;
        }
        
        case 'logout': {
          document.cookie = "magic_user=; Max-Age=0; path=/";
          setUser(null);
          addLine("👋 Logged out.");
          break;
        }
  
      case 'admin':
      case 'secret':
        if (!user) return addLine('⛔ Unauthorized. Type `login` first.');
        addLine(`👑 Welcome back, ${user}`);
        addLine(`• Access granted to hidden features...`);
        break;
  
      case 'clear':
        setLines([]);
        break;
  
      default:
        addLine(`command not found: ${inputCmd}`);
    }
    scroll();
  };
  const onKeyDown = e => {
    if (e.key === 'Enter') {
    const cmd = input.trim();
    if (!cmd) return;
    hist.current.push(cmd);
    idx.current = hist.current.length;
    setInput('');
    handle(cmd);
    } else if (e.key === 'ArrowUp') {
    idx.current = Math.max(0, idx.current - 1);
    setInput(hist.current[idx.current] || '');
    } else if (e.key === 'ArrowDown') {
    idx.current = Math.min(hist.current.length, idx.current + 1);
    setInput(hist.current[idx.current] || '');
    }
    };
  


  

  return(<div ref={termRef} id="app">{lines.map((l,i)=>l.html?<div key={i} dangerouslySetInnerHTML={{__html:l.text}}/>:<pre key={i}>{l.text}</pre>)}<div className="flex items-center mt-2"><span className="text-green-400">$</span><input className="bg-transparent flex-1 ml-2 focus:outline-none" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKeyDown} autoFocus/></div></div>);
}



