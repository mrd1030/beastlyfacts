import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2 } from 'lucide-react';
import { useFavoritesCtx } from '@/lib/FavoritesContext';

export default function FactModal({ fact, onClose }) {
  const { toggleFavorite, isFavorite } = useFavoritesCtx();
  if (!fact) return null;
  const fav = isFavorite(fact.id);

  return (
    <AnimatePresence>
      {fact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <motion.span
                className="text-6xl"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                {fact.emoji}
              </motion.span>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs font-display font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {fact.category} • {fact.animal}
            </span>

            <h2 className="font-display font-bold text-xl mt-3 mb-3 text-foreground">
              {fact.title}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              {fact.fact}
            </p>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => toggleFavorite(fact.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  fav ? 'bg-hotpink/10 text-hotpink' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${fav ? 'fill-hotpink' : ''}`} />
                {fav ? 'Saved to Pack' : 'Save to Pack'}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) navigator.share({ title: fact.title, text: fact.fact });
                  else navigator.clipboard.writeText(fact.fact);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}