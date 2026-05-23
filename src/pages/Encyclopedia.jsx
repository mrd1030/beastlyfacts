import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { encyclopediaAnimals, encyclopediaCategories, difficultyColor } from '@/lib/data/encyclopedia';

export default function Encyclopedia() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('category') || 'All';
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = useMemo(() => {
    return encyclopediaAnimals.filter(a => {
      const matchesCat = activeCategory === 'All' || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        a.name.toLowerCase().includes(q) ||
        a.scientific.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, activeCategory]);

  // Group by category
  const grouped = useMemo(() => {
    const cats = activeCategory === 'All'
      ? encyclopediaCategories.map(c => c.name)
      : [activeCategory];
    return cats.map(cat => ({
      name: cat,
      emoji: encyclopediaCategories.find(c => c.name === cat)?.emoji || '🦎',
      animals: filtered.filter(a => a.category === cat),
    })).filter(g => g.animals.length > 0);
  }, [filtered, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">📚</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-1">
              Animal Encyclopedia
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-lg">
              In-depth care guides for reptiles, mammals, birds &amp; more. Click any animal to explore.
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mt-5 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-secondary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              ✨ All
            </button>
            {encyclopediaCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                  activeCategory === cat.name
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
        {grouped.map((group) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
              <span>{group.emoji}</span> {group.name}
              <span className="text-xs font-body text-muted-foreground font-normal">({group.animals.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.animals.map((animal) => (
                <AnimalRow key={animal.id} animal={animal} />
              ))}
            </div>
          </motion.div>
        ))}

        {grouped.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="font-display font-bold text-foreground">Nothing found</p>
            <p className="text-sm text-muted-foreground font-body mt-1">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AnimalRow({ animal }) {
  const diffClass = difficultyColor[animal.difficulty] || 'text-muted-foreground bg-muted';

  if (animal.available && animal.guideId) {
    return (
      <Link to={`/guides/${animal.guideId}`}>
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:border-secondary/40 hover:shadow-sm transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl flex-shrink-0">{animal.emoji}</span>
            <div className="min-w-0">
              <p className="font-display font-semibold text-sm text-foreground truncate">{animal.name}</p>
              <p className="text-xs text-muted-foreground font-body italic truncate">{animal.scientific}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full ${diffClass}`}>
              {animal.difficulty}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between bg-card/50 border border-border/50 rounded-xl px-4 py-3 opacity-60">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl flex-shrink-0 grayscale">{animal.emoji}</span>
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-foreground truncate">{animal.name}</p>
          <p className="text-xs text-muted-foreground font-body italic truncate">{animal.scientific}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full ${diffClass}`}>
          {animal.difficulty}
        </span>
        <span className="text-xs font-display font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" /> Soon
        </span>
      </div>
    </div>
  );
}