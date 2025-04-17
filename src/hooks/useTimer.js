import { useState, useEffect } from 'react';

export function useTimer(initial = 0) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id;
    if (running) {
      id = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(id);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setSeconds(0); };

  return { seconds, running, start, pause, reset };
}
