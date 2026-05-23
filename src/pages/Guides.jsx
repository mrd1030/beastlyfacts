import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { guidesExtended } from '@/lib/data/guidesExtended';
import { difficultyColor } from '@/lib/data/encyclopedia';

const petTypes = ['All', 'Gecko', 'Lizard', 'Snake', 'Turtle', 'Small Mammal', 'Bird'];

export default function Guides() {
  const [petFilter, setPetFilter] = useState('All');

  const filtered = useMemo(() => {
    return guidesExtended.filter(g => {
      return petFilter === 'All' || g.petType === petFilter;
    });
  }, [petFilter]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-accent/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">📖</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-1">
              Care Guides
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-lg">
              Evidence-based husbandry guides for reptiles and exotic pets. Click any guide to read in full.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mt-5">
            {petTypes.map(pt => (
              <button
                key={pt}
                onClick={() => setPetFilter(pt)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                  petFilter === pt
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((guide, i) => (
            <GuideCard key={guide.id} guide={guide} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GuideCard({ guide, index }) {
  const diffClass = difficultyColor[guide.difficulty] || 'text-muted-foreground bg-muted';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -3 }}
    >
      <Link to={`/guides/${guide.id}`}>
        <div className="bg-card border border-border rounded-2xl p-5 hover:border-secondary/40 hover:shadow-md transition-all group h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{guide.emoji}</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full ${diffClass}`}>
                {guide.difficulty}
              </span>
            </div>
          </div>
          <h3 className="font-display font-bold text-base text-foreground mb-1 group-hover:text-secondary transition-colors">
            {guide.name}
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-2">{guide.petType}</p>
          <p className="text-xs text-muted-foreground font-body leading-relaxed flex-1">
            {guide.tagline}
          </p>
          <div className="flex items-center gap-1 mt-4 text-xs font-display font-semibold text-secondary">
            View full guide <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}