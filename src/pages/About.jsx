import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">🦁</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              About BeastlyFacts
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-3">What is BeastlyFacts? 🐾</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            BeastlyFacts is a fun, informative hub built for anyone who has ever fallen head-over-paws for an animal.
            Whether you're a reptile keeper who obsesses over thermostat gradients, a new dog owner Googling why your
            pup eats grass, or just someone who finds animal trivia endlessly fascinating — this is your place.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">
            The site is packed with hundreds of animal facts, in-depth care guides for reptiles and exotic pets,
            a growing encyclopedia of species profiles, a personality quiz that matches you to your spirit animal,
            and a regularly updated blog called the Critter Digest covering everything from UVB lighting to ball python
            feeding schedules. New content drops regularly, so there's always something fresh to discover.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-3">Who is BeastlyFacts for? 🏡</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            This site is for pet parents, families, kids, and curious minds of all ages. If you share your home with
            a bearded dragon, a ball python, a crested gecko, a cat, a dog, or a tank full of fish — there's
            something here for you. It's also great for people who don't (yet!) own pets but love learning cool,
            surprising facts about the animal kingdom.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">
            The care guides are written to be genuinely useful for beginners and intermediate keepers alike —
            no gatekeeping, no overwhelming jargon. Just clear, evidence-based information that helps animals
            thrive and their owners feel confident.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-3">Who built this? 👋</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            BeastlyFacts is built and maintained by one person who genuinely loves learning about animals and
            sharing that knowledge with fellow enthusiasts. No big editorial team, no corporate backing — just a
            passionate individual who started keeping reptiles, fell deep into the rabbit hole of animal biology and
            behaviour, and decided to turn that obsession into something useful and fun for everyone.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">
            Every fact is researched, every care guide is written with real animals in mind, and the whole site
            is designed to feel like getting advice from a knowledgeable friend rather than reading a dry textbook.
            If you've got questions, feedback, or just want to share a cool animal fact — reach out via the{' '}
            <Link to="/contact" className="text-secondary font-semibold hover:underline">Contact page</Link>.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-3"
        >
          <Link to="/facts" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:opacity-90 transition-opacity">
            🐾 Explore Facts
          </Link>
          <Link to="/guides" className="bg-card border border-border text-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:bg-muted transition-colors">
            📖 Care Guides
          </Link>
          <Link to="/quiz" className="bg-card border border-border text-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:bg-muted transition-colors">
            🧠 Take the Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  );
}