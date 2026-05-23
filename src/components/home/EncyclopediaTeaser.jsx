import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { encyclopediaCategories } from '@/lib/data/encyclopedia';

export default function EncyclopediaTeaser() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-5"
        >
          <div>
            <span className="text-2xl block mb-1">📚</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Animal Encyclopedia
            </h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Care guides for {encyclopediaCategories.length} categories of reptiles, birds &amp; more
            </p>
          </div>
          <Link to="/encyclopedia" className="hidden sm:flex items-center gap-1 text-xs font-display font-semibold text-secondary hover:underline flex-shrink-0">
            Browse all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {encyclopediaCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/encyclopedia?category=${encodeURIComponent(cat.name)}`}>
                <div className="bg-card border border-border rounded-2xl p-4 text-center hover:border-secondary/40 hover:shadow-md transition-all group">
                  <span className="text-3xl block mb-2">{cat.emoji}</span>
                  <p className="font-display font-bold text-xs text-foreground group-hover:text-secondary transition-colors">
                    {cat.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}