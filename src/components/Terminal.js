import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import { fetchRepos } from '../utils/github';
export default function Terminal() {
  const [lines,setLines]=useState([]),[input,setInput]=useState('');
  const hist=useRef([]), idx=useRef(0), {theme} = useContext(ThemeContext);
  const termRef=useRef();
  useEffect(()=>{ addLine(`Welcome to my CLI portfolio — ${theme} mode`); addLine('Type `help` for commands'); scroll(); },[theme]);
  const addLine=(text,html=false)=> setLines(l=>[...l,{text,html}]);
  const scroll=()=>setTimeout(()=>termRef.current.scrollTop=termRef.current.scrollHeight,50);
  const handle=async(cmd)=>{
    addLine(`$ ${cmd}`);
    switch(cmd){
      case 'help':['help — list commands','projects — show repos','fry ends — view friends','resume — open resume','login — secure login','clear — clear screen'].forEach(t=>addLine(t));break;
      case 'projects':addLine('Loading repos…');try{(await fetchRepos()).slice(0,5).forEach(r=>addLine(`• ${r.name}: ${r.html_url}`));}catch{addLine('Error loading repos')}break;
      case 'fry ends':addLine('╭──────────┬────────────────────┮');addLine('│ Name     │ Profile URL        │');addLine('├──────────┼────────────────────┤');addLine(`<span class="cli-link" onclick="window.open('/fryends/ash','_blank')">│ Ash 🐉   │ /fryends/ash         │</span>`,true);addLine(`<span class="cli-link" onclick="window.open('/fryends/danny','_blank')">│ Danny 🔥 │ /fryends/danny       │</span>`,true);addLine('╰──────────┴────────────────────╯');break;
      case 'resume':addLine('Opening resume…');window.open('/Resume.pdf','_blank');break;
      case 'login':addLine('Redirecting to login…');window.location.href='/api/login';break;
      case 'clear':setLines([]);break;
      default:addLine(`command not found: ${cmd}`);
    }
    scroll();
  };
  const onKeyDown=e=>{
    if(e.key==='Enter'){ const cmd=input.trim(); if(!cmd) return; hist.current.push(cmd); idx.current=hist.current.length; setInput(''); handle(cmd);}
    else if(e.key==='ArrowUp'){ idx.current=Math.max(0,idx.current-1); setInput(hist.current[idx.current]||''); }
    else if(e.key==='ArrowDown'){ idx.current=Math.min(hist.current.length,idx.current+1); setInput(hist.current[idx.current]||''); }
  };
  return(<div ref={termRef} id="app">{lines.map((l,i)=>l.html?<div key={i} dangerouslySetInnerHTML={{__html:l.text}}/>:<pre key={i}>{l.text}</pre>)}<div className="flex items-center mt-2"><span className="text-green-400">$</span><input className="bg-transparent flex-1 ml-2 focus:outline-none" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKeyDown} autoFocus/></div></div>);
}