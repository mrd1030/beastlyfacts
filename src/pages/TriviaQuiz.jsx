import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import { triviaQuestions } from '@/lib/data/triviaQuestions';

const TOTAL = triviaQuestions.length;

export default function TriviaQuiz() {
  const [step, setStep] = useState('intro'); // intro | quiz | results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);   // index of chosen answer
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(1);

  const question = triviaQuestions[currentIndex];

  const handleSelect = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setDirection(1);
    if (currentIndex + 1 >= TOTAL) {
      setStep('results');
    } else {
      setAnswered(false);
      setSelected(null);
      setCurrentIndex(i => i + 1);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setDirection(1);
  };

  const getScoreLabel = () => {
    const pct = score / TOTAL;
    if (pct === 1) return { label: "Perfect Score! 🏆", color: "text-emerald-500" };
    if (pct >= 0.8) return { label: "Animal Expert! 🦁", color: "text-emerald-500" };
    if (pct >= 0.6) return { label: "Wild Enthusiast! 🐾", color: "text-secondary" };
    if (pct >= 0.4) return { label: "Keep Exploring! 🌿", color: "text-amber-500" };
    return { label: "Time to Study! 📚", color: "text-red-500" };
  };

  const variants = {
    enter: (dir) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir * -80, opacity: 0 }),
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <span className="text-6xl block mb-4">🌍</span>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">Animal Origins Trivia</h1>
          <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
            Test your knowledge of where animals and breeds come from! {TOTAL} questions, instant feedback, and a final score. Choose carefully — you can't change your answer!
          </p>
          <div className="flex items-center justify-center gap-6 mb-8 text-sm font-body text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">❓</span>
              <span>{TOTAL} Questions</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">⚡</span>
              <span>Instant Feedback</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🏆</span>
              <span>Final Score</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStep('quiz')}
            className="bg-secondary text-secondary-foreground font-display font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-secondary/30"
          >
            Start Quiz 🚀
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (step === 'results') {
    const { label, color } = getScoreLabel();
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="max-w-md w-full text-center"
        >
          <motion.span
            className="text-7xl block mb-4"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Trophy className={`w-20 h-20 mx-auto ${color}`} />
          </motion.span>

          <h1 className="font-display font-bold text-3xl text-foreground mb-2">Quiz Complete!</h1>
          <p className={`font-display font-bold text-xl mb-6 ${color}`}>{label}</p>

          <div className="bg-card border border-border rounded-3xl p-8 mb-6">
            <p className="text-sm text-muted-foreground font-body mb-2">Your score</p>
            <p className="font-display font-bold text-6xl text-foreground">
              {score}<span className="text-2xl text-muted-foreground">/{TOTAL}</span>
            </p>
            <div className="w-full bg-muted rounded-full h-3 mt-4">
              <motion.div
                className="bg-secondary h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(score / TOTAL) * 100}%` }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-body mt-2">{Math.round((score / TOTAL) * 100)}% correct</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRestart}
            className="flex items-center gap-2 mx-auto bg-secondary text-secondary-foreground font-display font-bold text-sm px-6 py-3 rounded-2xl"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Quiz step
  return (
    <div className="min-h-screen px-4 pt-12 pb-16">
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-body text-muted-foreground">Question {currentIndex + 1} of {TOTAL}</span>
          <span className="text-xs font-display font-bold text-secondary">{score} pts</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <motion.div
            className="bg-secondary h-2 rounded-full"
            animate={{ width: `${((currentIndex) / TOTAL) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Question */}
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">{question.emoji}</span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, i) => {
                let style = "bg-card border-border text-foreground hover:border-secondary/40";
                if (answered) {
                  if (i === question.correct) style = "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
                  else if (i === selected) style = "bg-red-50 border-red-400 text-red-800 dark:bg-red-950 dark:text-red-300";
                  else style = "bg-card border-border text-muted-foreground opacity-50";
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    whileHover={answered ? {} : { scale: 1.02 }}
                    whileTap={answered ? {} : { scale: 0.98 }}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-body text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                  >
                    <span>{option}</span>
                    {answered && i === question.correct && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                    {answered && i === selected && i !== question.correct && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Fact reveal */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`rounded-2xl p-4 mb-6 border ${selected === question.correct ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800' : 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'}`}>
                    <p className="text-xs font-display font-bold text-muted-foreground mb-1">
                      {selected === question.correct ? '✅ Correct!' : '❌ Not quite!'}
                    </p>
                    <p className="text-sm font-body text-foreground leading-relaxed">{question.fact}</p>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="w-full bg-secondary text-secondary-foreground font-display font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2"
                  >
                    {currentIndex + 1 >= TOTAL ? '🏆 See Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}