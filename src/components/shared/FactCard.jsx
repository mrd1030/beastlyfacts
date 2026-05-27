import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { useFavoritesCtx } from '@/lib/FavoritesContext';

export default function FactCard({ fact, index = 0, onOpen }) {
  const { toggleFavorite, isFavorite } = useFavoritesCtx();
  const fav = isFavorite(fact.id);

  const handleShare = (e) => {
    e.stopPropagation();
    const factsPageUrl = window.location.origin + '/facts';
    if (navigator.share) {
      navigator.share({ title: fact.title, text: `${fact.emoji} ${fact.fact}`, url: factsPageUrl });
    } else {
      navigator.clipboard.writeText(`${fact.emoji} ${fact.fact} ${factsPageUrl}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group cursor-pointer"
      onClick={() => onOpen?.(fact)}
    >
      <div className="bg-card border border-border rounded-2xl p-5 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-secondary/10">
        {/* Emoji & Category */}
        <div className="flex items-start justify-between mb-3">
          <motion.span
            className="text-4xl"
            whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {fact.emoji}
          </motion.span>
          <span className="text-xs font-display font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {fact.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base mb-2 text-foreground group-hover:text-secondary transition-colors">
          {fact.title}
        </h3>

        {/* Fact */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {fact.fact}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(fact.id); }}
            className="flex items-center gap-1 text-xs font-semibold transition-colors"
          >
            <motion.div
              whileTap={{ scale: 1.4, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-hotpink text-hotpink' : 'text-muted-foreground'}`} />
            </motion.div>
            <span className={fav ? 'text-hotpink' : 'text-muted-foreground'}>
              {fav ? 'Saved!' : 'Save'}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
}