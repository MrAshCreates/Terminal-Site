// src/components/WindowWrapper.js
import { useState } from 'react';
export default function WindowWrapper({ children }) {
  const [visible, setVisible] = useState(true);
  const [showApp, setShowApp] = useState(false);

  const reopen = () => { setVisible(true); setShowApp(false); };

  const close = () => {
    setVisible(false);
    setShowApp(true);
    setTimeout(reopen, 1500);                    /* auto-reopen after 1.5s */
  };

  return (
    <>
      {showApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div 
            className="p-4 bg-white rounded-full shadow-lg cursor-pointer animate-fade"
            onClick={reopen}
          >
            <img src="/favicon.ico" alt="Open Terminal" className="w-12 h-12"/>
          </div>
        </div>
      )}
      {visible && (
        <div className="window">
          <TitleBar 
            title="mrashcreates.xyz" 
            onClose={close} 
            onMinimize={()=>{}} 
            onMaximize={()=>{}} 
          />
          {children}
        </div>
      )}
    </>
  );
}