import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue];
}

export function useDarkMode() {
  const [dark, setDark] = useLocalStorage('beastly-dark-mode', false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return [dark, setDark];
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('beastly-favorites', []);

  const toggleFavorite = (factId) => {
    setFavorites(prev =>
      prev.includes(factId) ? prev.filter(id => id !== factId) : [...prev, factId]
    );
  };

  const isFavorite = (factId) => favorites.includes(factId);

  return { favorites, toggleFavorite, isFavorite };
}

export function useDailyStreak() {
  const [streak, setStreak] = useLocalStorage('beastly-streak', { count: 0, lastDate: null });

  const recordVisit = () => {
    const today = new Date().toDateString();
    if (streak.lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (streak.lastDate === yesterday.toDateString()) {
      setStreak({ count: streak.count + 1, lastDate: today });
    } else {
      setStreak({ count: 1, lastDate: today });
    }
  };

  return { streak: streak.count, recordVisit };
}