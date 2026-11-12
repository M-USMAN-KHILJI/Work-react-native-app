import { useState, useEffect } from 'react';

/**
 * useCurrentTime — returns a live-updating time string that ticks every second.
 * Replaces the manual setInterval + formatTime pattern on the Dashboard.
 */
export function useCurrentTime(): string {
  const format = () =>
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const [time, setTime] = useState<string>(format());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}

