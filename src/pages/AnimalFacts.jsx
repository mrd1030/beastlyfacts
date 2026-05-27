import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    emoji: '🐍',
    heading: 'Reptile Facts That Will Blow Your Mind',
    items: [
      'Ball pythons can go months without eating when they\'re in breeding season — and that\'s totally normal.',
      'Bearded dragons wave one arm as a submissive gesture to other dragons. It\'s their version of "no threat here!"',
      'Leopard geckos store fat reserves in their thick tails — a skinny tail can signal poor health.',
      'Crested geckos were thought to be extinct until they were rediscovered in 1994 in New Caledonia.',
      'Chameleons don\'t change color primarily for camouflage — they do it to communicate mood and temperature.',
    ],
  },
  {
    emoji: '🐶',
    heading: 'Dog Behavior & Care Tips',
    items: [
      'Dogs have three eyelids — a third one called a nictitating membrane helps protect and moisten the eye.',
      'A dog\'s nose print is as unique as a human fingerprint. No two are alike!',
      'Dogs dream just like humans do. Their REM sleep looks remarkably similar to ours.',
      'Puppies are born completely blind and deaf — they rely entirely on smell and touch for their first two weeks.',
      'Regular mental stimulation is just as tiring for dogs as physical exercise. Puzzle feeders work wonders.',
    ],
  },
  {
    emoji: '🐱',
    heading: 'Cat Behavior & Fun Facts',
    items: [
      'Cats only meow at humans — not at other cats. They invented it specifically to communicate with us.',
      'A cat\'s purr vibrates at 25–150 Hz, a frequency known to promote bone healing and reduce stress.',
      'Cats have a specialized collarbone that lets them always land on their feet — it\'s called the "righting reflex."',
      'Adult cats are technically lactose intolerant, despite what cartoons suggest. Skip the milk bowl!',
      'Cats spend up to 70% of their lives sleeping — they\'re crepuscular, most active at dawn and dusk.',
    ],
  },
  {
    emoji: '🦜',
    heading: 'Bird & Exotic Pet Care Essentials',
    items: [
      'Parrots need social interaction daily — isolation can cause feather plucking and behavioral issues.',
      'Rabbits are not low-maintenance pets. They need at least 3 hours of exercise outside their enclosure every day.',
      'Guinea pigs are highly social and should ideally be kept in pairs or small groups.',
      'Tortoises can live for over 100 years — adopting one is genuinely a lifelong commitment.',
      'Many exotic birds can mimic not just words but full sentences, tones, and even laughs.',
    ],
  },
];

const keywords = [
  'pet care tips', 'animal trivia', 'dog facts', 'cat behavior', 'reptile care',
  'happy pets', 'exotic animals', 'fun facts', 'pet health',
];

export default function AnimalFacts() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-accent/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">🐾</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Fun Animal Facts & Pet Care Tips
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-2xl leading-relaxed">
              From surprising dog facts and cat behavior secrets to reptile care essentials and exotic pet trivia —
              this is your go-to resource for learning cool, useful, and genuinely surprising things about animals.
              Whether you're a first-time pet owner or a seasoned keeper, there's always something new to discover.
            </p>
          </motion.div>

          {/* Keyword chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {keywords.map(k => (
              <span key={k} className="bg-card border border-border text-xs font-body text-muted-foreground px-3 py-1 rounded-full">
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
        {sections.map((section, i) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8"
          >
            <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <span>{section.emoji}</span> {section.heading}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-0.5 flex-shrink-0">•</span>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/5 border border-primary/10 rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="font-display font-bold text-lg text-foreground mb-2">Want more? We've got hundreds of facts 🌟</p>
          <p className="text-sm font-body text-muted-foreground mb-5">
            Explore our full facts library, take the animal personality quiz, or dive into our in-depth care guides.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/facts" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:opacity-90 transition-opacity">
              🐾 Browse All Facts
            </Link>
            <Link to="/guides" className="bg-card border border-border text-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:bg-muted transition-colors">
              📖 Care Guides
            </Link>
            <Link to="/encyclopedia" className="bg-card border border-border text-foreground px-5 py-2.5 rounded-full font-display font-bold text-sm hover:bg-muted transition-colors">
              📚 Encyclopedia
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}