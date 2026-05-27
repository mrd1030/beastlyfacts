import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = localStorage.getItem('beastly-favorites');
      return item ? JSON.parse(item) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('beastly-favorites', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const toggleFavorite = (factId) => {
    setFavorites(prev =>
      prev.includes(factId) ? prev.filter(id => id !== factId) : [...prev, factId]
    );
  };

  const isFavorite = (factId) => favorites.includes(factId);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('beastly-favorites');
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesCtx() {
  return useContext(FavoritesContext);
}