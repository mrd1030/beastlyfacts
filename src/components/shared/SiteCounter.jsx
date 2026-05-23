import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

// Simulated visitor counter using localStorage seed + deterministic offset
// In production you'd replace this with a real backend counter
function getSiteCount() {
  const BASE = 14200; // Base count to start from
  const seed = localStorage.getItem('beastly-visit-seed');
  if (!seed) {
    const randomOffset = Math.floor(Math.random() * 800);
    localStorage.setItem('beastly-visit-seed', String(randomOffset));
    return BASE + randomOffset;
  }
  // Increment slightly each session
  const visits = parseInt(localStorage.getItem('beastly-visit-count') || '0', 10);
  return BASE + parseInt(seed, 10) + visits;
}

export default function SiteCounter() {
  const [count, setCount] = useState(null);
  const [visits, setVisits] = useLocalStorage('beastly-visit-count', 0);

  useEffect(() => {
    setVisits(v => v + 1);
    setCount(getSiteCount());
  }, []);

  if (!count) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
      <span>{count.toLocaleString()} visitors</span>
    </div>
  );
}