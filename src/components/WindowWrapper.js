import { useState } from 'react';
import TitleBar from './TitleBar';
export default function WindowWrapper({ children }) {
  const [vis, setVis] = useState(true), [app, setApp] = useState(false);
  const reopen = () => { setVis(true); setApp(false); };
  const close  = () => { setVis(false); setApp(true); setTimeout(reopen,1500); };
  return (<>
    {app && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-full shadow-lg cursor-pointer animate-fade" onClick={reopen}>
        <img src="/favicon.ico" className="w-12 h-12"/>
      </div>
    </div>}
    {vis && <div className="window">
      <TitleBar title="mrashcreates.xyz" onClose={close} onMinimize={()=>{}} onMaximize={()=>{}}/>
      {children}
    </div>}
  </>);
}