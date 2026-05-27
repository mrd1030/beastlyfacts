import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { facts } from '@/lib/data/facts';
import { useFavoritesCtx } from '@/lib/FavoritesContext';
import FactCard from '@/components/shared/FactCard';
import FactModal from '@/components/shared/FactModal';
import ClearPackDialog from '@/components/layout/ClearPackDialog';

export default function Pack() {
  const { favorites } = useFavoritesCtx();
  const [selectedFact, setSelectedFact] = useState(null);

  const savedFacts = facts.filter(f => favorites.includes(f.id));

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-3xl mb-2 block">❤️</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
            My Beast Pack
          </h1>
          <p className="text-sm text-muted-foreground font-body max-w-lg">
            Your personal collection of favorite facts! Tap the heart on any fact to save it here. 🐾
          </p>
        </motion.div>

        {savedFacts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedFacts.map((fact, i) => (
              <FactCard key={fact.id} fact={fact} index={i} onOpen={setSelectedFact} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.span
              className="text-6xl block mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💔
            </motion.span>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              Your pack is empty!
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6 max-w-sm mx-auto">
              Go explore some facts and tap the ❤️ to start building your collection!
            </p>
            <Link to="/facts">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-6 rounded-xl inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Browse Facts
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>

      <FactModal fact={selectedFact} onClose={() => setSelectedFact(null)} />

      {/* Pack management section */}
      <div className="mt-16 pt-8 border-t border-border max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-base text-foreground mb-1">Pack Management</h2>
        <p className="text-xs text-muted-foreground font-body mb-4">Manage your Beast Pack collection.</p>
        <ClearPackDialog />
      </div>
    </div>
  );
}