import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { facts, categories } from '@/lib/data/facts';
import FactCard from '@/components/shared/FactCard';
import FactModal from '@/components/shared/FactModal';

export default function Facts() {
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedFact, setSelectedFact] = useState(null);

  const allCategories = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    return facts.filter(f => {
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      const matchesSearch = !search || 
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.animal.toLowerCase().includes(search.toLowerCase()) ||
        f.fact.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">🧠</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
              Fun Animal Facts
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-lg">
              Mind-blowing facts that will make you say "wait, REALLY?!" 🤯
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search facts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-secondary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-secondary text-secondary-foreground shadow-md shadow-secondary/20'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-secondary/30'
                }`}
              >
                {cat === 'All' ? '✨ All' : `${categories.find(c => c.name === cat)?.emoji || ''} ${cat}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="text-xs text-muted-foreground font-body mb-6">{filtered.length} facts found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((fact, i) => (
            <FactCard key={fact.id} fact={fact} index={i} onOpen={setSelectedFact} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="font-display font-bold text-foreground">No facts found!</p>
            <p className="text-sm text-muted-foreground font-body mt-1">Try a different search or category.</p>
          </div>
        )}
      </div>

      <FactModal fact={selectedFact} onClose={() => setSelectedFact(null)} />
    </div>
  );
}