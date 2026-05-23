import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { guidesExtended } from '@/lib/data/guidesExtended';
import { difficultyColor } from '@/lib/data/encyclopedia';

const featured = guidesExtended.slice(0, 4);

export default function GuideSpotlight() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <span className="text-2xl block mb-1">📖</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Featured Care Guides
            </h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Detailed, research-backed guides for exotic pets
            </p>
          </div>
          <Link to="/guides" className="hidden sm:flex items-center gap-1 text-xs font-display font-semibold text-secondary hover:underline flex-shrink-0">
            All guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((guide, i) => {
            const diffClass = difficultyColor[guide.difficulty] || 'text-muted-foreground bg-muted';
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                <Link to={`/guides/${guide.id}`}>
                  <div className="bg-card border border-border rounded-2xl p-4 hover:border-secondary/40 hover:shadow-md transition-all group h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{guide.emoji}</span>
                      <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full ${diffClass}`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground group-hover:text-secondary transition-colors mb-1">
                      {guide.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed flex-1">
                      {guide.tagline}
                    </p>
                    <div className="flex items-center gap-0.5 mt-3 text-xs font-display font-semibold text-secondary">
                      Read guide <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-5 sm:hidden">
          <Link to="/guides" className="inline-flex items-center gap-1 text-sm font-display font-bold text-secondary">
            All care guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}