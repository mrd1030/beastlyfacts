import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function QuizTeaser() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* Decorative emojis */}
          {['🐕', '🐱', '🦜', '🦔', '🐰', '🐍', '🦎'].map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl opacity-20"
              style={{ right: `${5 + i * 12}%`, top: `${10 + (i % 3) * 25}%` }}
              animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}

          <div className="relative z-10 max-w-lg">
            <span className="text-4xl mb-3 block">🎯</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground mb-3">
              Which Critter Are You?
            </h2>
            <p className="text-sm text-primary-foreground/80 font-body mb-6 leading-relaxed">
              Take our fun personality quiz and discover your animal spirit match! Are you a chill ball python or a chatty parrot? 🤔
            </p>
            <Link to="/quiz">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-secondary/20"
              >
                Take the Quiz
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}