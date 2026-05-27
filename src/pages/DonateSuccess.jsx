import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function DonateSuccess() {
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
          <CheckCircle className="w-20 h-20 text-green-500" />
        </motion.div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-3">Thank You! 🐾</h1>
        <p className="text-muted-foreground font-body leading-relaxed mb-6">
          Your donation was successful. Your support helps us continue sharing amazing animal facts!
        </p>
        <Link to="/">
          <Button className="w-full font-display font-bold text-lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}