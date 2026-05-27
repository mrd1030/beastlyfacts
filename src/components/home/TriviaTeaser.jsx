import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function TriviaTeaser() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-accent/90 to-teal rounded-3xl p-8 sm:p-10 overflow-hidden flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Decorative */}
          {['🌍', '🦁', '🐧', '🦎', '🐆'].map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl opacity-15 pointer-events-none"
              style={{ right: `${4 + i * 10}%`, top: `${8 + (i % 3) * 30}%` }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.4, delay: i * 0.3 }}
            >
              {e}
            </motion.span>
          ))}

          <div className="relative z-10 flex-1">
            <span className="text-4xl mb-3 block">🌍</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-accent-foreground mb-2">
              Animal Origins Trivia
            </h2>
            <p className="text-sm text-accent-foreground/80 font-body mb-5 leading-relaxed max-w-md">
              Do you know where your favourite breeds and animals come from? Test your knowledge with {' '}
              <span className="font-bold">15 trivia questions</span> and earn your expert badge! 🏆
            </p>
            <Link to="/quiz?tab=trivia">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-accent font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg"
              >
                Take the Trivia
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          {/* Score preview badges */}
          <div className="relative z-10 flex flex-col gap-2 flex-shrink-0">
            {[['🏆', 'Perfect', 'text-yellow-500'], ['🦁', 'Expert', 'text-emerald-500'], ['🐾', 'Enthusiast', 'text-secondary']].map(([e, l, c]) => (
              <div key={l} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <span>{e}</span>
                <span className={`font-display font-bold text-sm text-accent-foreground`}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}