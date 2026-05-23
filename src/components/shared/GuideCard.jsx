import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuideCard({ guide, index = 0 }) {
  const difficultyColor = {
    Beginner: 'bg-teal/10 text-teal',
    Intermediate: 'bg-secondary/10 text-secondary',
    Advanced: 'bg-hotpink/10 text-hotpink',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/guides?id=${guide.id}`} className="block group">
        <div className="bg-card border border-border rounded-2xl p-5 h-full transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
          <div className="flex items-start justify-between mb-3">
            <motion.span
              className="text-4xl"
              whileHover={{ rotate: [0, -10, 10, 0] }}
            >
              {guide.emoji}
            </motion.span>
            <span className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full ${difficultyColor[guide.difficulty] || 'bg-muted text-muted-foreground'}`}>
              {guide.difficulty}
            </span>
          </div>
          <h3 className="font-display font-bold text-base mb-1 text-foreground group-hover:text-accent transition-colors">
            {guide.name}
          </h3>
          <p className="text-xs text-muted-foreground font-semibold mb-2">{guide.petType}</p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {guide.tagline}
          </p>
          <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
            Read Guide <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}