import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function DonateCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="max-w-md w-full p-8 bg-card rounded-2xl shadow-lg text-center border border-border"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <XCircle className="w-20 h-20 text-destructive" />
        </motion.div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-3">Donation Cancelled</h1>
        <p className="text-muted-foreground font-body leading-relaxed mb-6">
          No worries — your donation was cancelled. Feel free to try again whenever you're ready!
        </p>
        <Link to="/">
          <Button variant="outline" className="w-full font-display font-bold text-lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}