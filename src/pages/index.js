import { useState } from 'react';
import TitleBar from '../components/TitleBar';
import Terminal from '../components/Terminal';

export default function Home() {
  const [visible, setVisible] = useState(true);
  const [min, setMin] = useState(false);
  const [max, setMax] = useState(false);

  if (!visible) return null;
  const cls = max ? 'fixed inset-0 m-0' : 'window';

  return (
    <div className={`${cls} transition-all duration-300`}>
      <TitleBar
        title="mrashcreates.xyz"
        onClose={() => setVisible(false)}
        onMinimize={() => setMin(!min)}
        onMaximize={() => setMax(!max)}
      />
      {!min && <Terminal />}
    </div>
  );
}