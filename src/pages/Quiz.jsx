import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions, quizResults } from '@/lib/data/quizQuestions';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

export default function Quiz() {
  const [step, setStep] = useState(0); // 0 = intro
  const [scores, setScores] = useState({});
  const [result, setResult] = useLocalStorage('beastly-quiz-result', null);
  const [showResult, setShowResult] = useState(!!result);

  const currentQ = quizQuestions[step - 1];
  const totalQ = quizQuestions.length;
  const progress = step > 0 ? (step / totalQ) * 100 : 0;

  const handleAnswer = (option) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([animal, score]) => {
      newScores[animal] = (newScores[animal] || 0) + score;
    });
    setScores(newScores);

    if (step >= totalQ) {
      // Calculate result
      const topAnimal = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      const quizResult = quizResults[topAnimal];
      setResult(quizResult);
      setShowResult(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#FF8C42', '#00B8A9', '#FFD93D', '#E8336D', '#0F3A1F'] });
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setScores({});
    setResult(null);
    setShowResult(false);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `I took the BeastlyFacts quiz and I'm a ${result.name}! ${result.emoji} Find out which critter you are!`;
    if (navigator.share) {
      navigator.share({ title: 'My BeastlyFacts Quiz Result', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  // Result screen
  if (showResult && result) {
    return (
      <div className="min-h-screen pt-12 px-4 sm:px-6">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <motion.span
              className="text-8xl block mb-4"
              animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {result.emoji}
            </motion.span>

            <h1 className="font-display font-bold text-3xl text-foreground mb-3">{result.title}</h1>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 max-w-md mx-auto">
              {result.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {result.traits.map(trait => (
                <span key={trait} className="bg-secondary/10 text-secondary font-display font-semibold text-xs px-3 py-1.5 rounded-full">
                  {trait}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Result
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={restart}
                className="bg-card border border-border text-foreground font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Intro screen
  if (step === 0) {
    return (
      <div className="min-h-screen pt-12 px-4 sm:px-6">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.span
              className="text-6xl block mb-4"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎯
            </motion.span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Which Critter Are You?
            </h1>
            <p className="text-sm text-muted-foreground font-body mb-8 max-w-md mx-auto leading-relaxed">
              Answer {totalQ} fun questions and discover which animal matches your personality! 🐾 Are you a loyal golden retriever or a mysterious ball python?
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(1)}
              className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-8 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-secondary/20"
            >
              Let's Go! <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display font-bold text-muted-foreground">
              Question {step} of {totalQ}
            </span>
            <span className="text-xs font-display font-bold text-secondary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Paw prints */}
          <div className="flex gap-1 mt-2">
            {Array.from({ length: totalQ }).map((_, i) => (
              <span key={i} className={`text-sm ${i < step ? 'opacity-100' : 'opacity-20'}`}>
                🐾
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl block mb-3">{currentQ.emoji}</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-6">
              {currentQ.question}
            </h2>

            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="text-left bg-card border border-border rounded-xl p-4 text-sm font-body text-foreground hover:border-secondary/50 hover:shadow-md hover:shadow-secondary/10 transition-all"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}