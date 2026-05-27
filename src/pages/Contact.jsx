import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-secondary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">💌</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
              Get in Touch
            </h1>
            <p className="text-sm text-muted-foreground font-body">
              Got a question, a cool fact to share, or just want to say hi? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 space-y-5">
        <motion.a
          href="mailto:hello@beastlyfacts.com"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:border-secondary/40 hover:shadow-sm transition-all group"
        >
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="font-display font-bold text-base text-foreground group-hover:text-secondary transition-colors">Email Us</p>
            <p className="text-sm text-muted-foreground font-body">hello@beastlyfacts.com</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">We read every message 🐾</p>
          </div>
        </motion.a>

        <motion.a
          href="https://instagram.com/beastlyfacts"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:border-secondary/40 hover:shadow-sm transition-all group"
        >
          <div className="w-12 h-12 bg-hotpink/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Instagram className="w-5 h-5 text-hotpink" />
          </div>
          <div>
            <p className="font-display font-bold text-base text-foreground group-hover:text-hotpink transition-colors">Instagram</p>
            <p className="text-sm text-muted-foreground font-body">@beastlyfacts</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Daily animal facts & behind-the-scenes 🦎</p>
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/5 border border-primary/10 rounded-2xl p-6"
        >
          <p className="font-display font-bold text-sm text-foreground mb-1">📬 Response time</p>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">
            This site is run by one person who also keeps real live animals — so responses may take a couple of days.
            But every message gets read and appreciated. Whether you've spotted an error, want to suggest a new guide,
            or just want to chat about geckos, drop a line!
          </p>
        </motion.div>
      </div>
    </div>
  );
}