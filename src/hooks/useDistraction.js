import { useEffect, useState, useRef } from 'react';

/**
 * Track how often user leaves the tab (blur) as a distraction proxy.
 * Only counts when "active" is true.
 */
export function useDistraction(active = false) {
  const [count, setCount] = useState(0);
  const [last, setLast] = useState(null);
  const ignoreInitial = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      ignoreInitial.current = false;
    }, 500);

    const onBlur = () => {
      if (ignoreInitial.current || !active) return;
      setCount(c => c + 1);
      setLast(Date.now());
    };

    if (active) {
      window.addEventListener('blur', onBlur);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('blur', onBlur);
    };
  }, [active]);

  return { count, last };
}