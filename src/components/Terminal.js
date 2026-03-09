"use client";
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../app/layout';
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
          'echo, msg, or wall — send message to Discord',
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
        case 'wget':
          if (args[0] === 'MySites') {
            addLine('╭────────────┬────────────────────┮');
            addLine('│ Site Name  │ Site URL           │');
            addLine('├────────────┼────────────────────┤');
            addLine(`<span class="cli-link" onclick="window.open('https://asherwinstead.dev','_blank')">│ Blog/Guides         │ asherwinstead.dev     │</span>`, true);
            addLine(`<span class="cli-link" onclick="window.open('https://globalgrounds.news,'_blank')">│ News(Not Online)    │ globalgrounds.news    │</span>`, true);
            addLine('╰────────────┴────────────────────╯');
          } else {
            addLine(`command not found: ${inputCmd}`);
          }
          break;

      case 'fry':
        if (args[0] === 'ends') {
          addLine('╭──────────┬────────────────────┮');
          addLine('│ Name     │ Profile URL        │');
          addLine('├──────────┼────────────────────┤');
          addLine(`<span class="cli-link" onclick="window.open('/fryends/ash.html','_blank')">│ Ash      │ /fryends/ash       │</span>`, true);
          addLine(`<span class="cli-link" onclick="window.open('/fryends/danny.html,'_blank')">│ Danny    │ /fryends/danny     │</span>`, true);
          addLine(`<span class="cli-link" onclick="window.open('/fryends/kailynn.html','_blank')">│ Kailynn  │ /fryends/kailynn   │</span>`, true);
          addLine('╰──────────┴────────────────────╯');
        } else {
          addLine(`command not found: ${inputCmd}`);
        }
        break;
  
      case 'resume':
        addLine('Opening resume…');
        window.open('/Resume.pdf', '_blank');
        break;

      case 'rc':
        addLine('Opening Labor Tracker…');
        window.open('https://mrashcreates.xyz/rc_labor_tracker.html', '_blank');
        break;
  
        case ('msg' || 'wall' || 'echo'):
        if (!argString) return addLine('Usage: [message cmd] <your message>');
        addLine('📤 Sending Message...');
        try {
          const res = await fetch('/api/alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: argString })
          });
          const data = await res.json();
          if (data.success) addLine('✅ Message sent to Discord!');
          else throw new Error();
        } catch {
          addLine('❌ Failed to send Message.');
        }
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



