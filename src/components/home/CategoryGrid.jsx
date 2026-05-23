import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data/facts';

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-2xl mb-1 block">🗂️</span>
          <h2 className="font-display font-bold text-2xl text-foreground">Explore by Category</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Pick your favorite kind of critter</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.05 }}
            >
              <Link
                to={`/facts?category=${encodeURIComponent(cat.name)}`}
                className="block bg-card border border-border rounded-2xl p-5 text-center transition-shadow hover:shadow-lg hover:shadow-secondary/10"
              >
                <motion.span
                  className="text-4xl block mb-2"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.emoji}
                </motion.span>
                <span className="font-display font-bold text-xs text-foreground">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}