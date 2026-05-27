import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { facts } from '@/lib/data/facts';
import { useFavoritesCtx } from '@/lib/FavoritesContext';

const greetings = [
  "Hey there, animal friend! 🐾 Want a fun fact?",
  "Did you know? 🤓 Click me for a random fact!",
  "Welcome back to the wild side! 🌿",
  "I've got a beastly fact for you! 🦁",
];

export default function BeastlyBuddy() {
  const [open, setOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState(null);
  const [greeting] = useState(greetings[Math.floor(Math.random() * greetings.length)]);
  const { toggleFavorite, isFavorite } = useFavoritesCtx();

  const getRandomFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setCurrentFact(randomFact);
  };

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-3 bg-card border border-border rounded-2xl p-4 shadow-xl w-72"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">🦊</span>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-muted rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            {!currentFact ? (
              <>
                <p className="text-sm font-body text-foreground mb-3">{greeting}</p>
                <button
                  onClick={getRandomFact}
                  className="w-full bg-secondary text-secondary-foreground font-display font-bold text-sm py-2 rounded-xl hover:opacity-90 transition-opacity"
                >
                  🎲 Random Fact!
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-body text-foreground mb-1">
                  <span className="text-lg mr-1">{currentFact.emoji}</span>
                  <strong>{currentFact.title}</strong>
                </p>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{currentFact.fact}</p>
                <div className="flex gap-2">
                  <button
                    onClick={getRandomFact}
                    className="flex-1 bg-secondary text-secondary-foreground font-display font-bold text-sm py-2 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    🎲 Another!
                  </button>
                  <button
                    onClick={() => toggleFavorite(currentFact.id)}
                    className={`px-3 py-2 rounded-xl transition-all ${isFavorite(currentFact.id) ? 'bg-pink-100 dark:bg-pink-950' : 'bg-muted hover:bg-muted/80'}`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(currentFact.id) ? 'fill-hotpink text-hotpink' : 'text-muted-foreground'}`} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { setOpen(!open); if (!open) setCurrentFact(null); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 text-2xl"
      >
        <motion.span
          animate={open ? {} : { rotate: [0, -5, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          🦊
        </motion.span>
      </motion.button>
    </div>
  );
}