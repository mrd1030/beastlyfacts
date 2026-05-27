import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Share2, CheckCircle2, XCircle, Trophy, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions, quizResults } from '@/lib/data/quizQuestions';
import { triviaQuestions } from '@/lib/data/triviaQuestions';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

const TRIVIA_TOTAL = triviaQuestions.length;

// ─── Personality Quiz ───────────────────────────────────────────
function PersonalityQuiz() {
  const [step, setStep] = useState(0);
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

  if (showResult && result) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <motion.span
            className="text-8xl block mb-4"
            animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            {result.emoji}
          </motion.span>
          <h2 className="font-display font-bold text-3xl text-foreground mb-3">{result.title}</h2>
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
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleShare}
              className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Result
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={restart}
              className="bg-card border border-border text-foreground font-display font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retake
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.span className="text-6xl block mb-4" animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🎯
          </motion.span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">Which Critter Are You?</h2>
          <p className="text-sm text-muted-foreground font-body mb-8 max-w-md mx-auto leading-relaxed">
            Answer {totalQ} fun questions and discover which animal matches your personality! 🐾 Are you a loyal golden retriever or a mysterious ball python?
          </p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
            className="bg-secondary text-secondary-foreground font-display font-bold text-sm py-3 px-8 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-secondary/20">
            Let's Go! <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-display font-bold text-muted-foreground">Question {step} of {totalQ}</span>
          <span className="text-xs font-display font-bold text-secondary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalQ }).map((_, i) => (
            <span key={i} className={`text-sm ${i < step ? 'opacity-100' : 'opacity-20'}`}>🐾</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
          <span className="text-4xl block mb-3">{currentQ.emoji}</span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-6">{currentQ.question}</h2>
          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, i) => (
              <motion.button key={i} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(option)}
                className="text-left bg-card border border-border rounded-xl p-4 text-sm font-body text-foreground hover:border-secondary/50 hover:shadow-md hover:shadow-secondary/10 transition-all">
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Trivia Quiz ────────────────────────────────────────────────
function TriviaQuizSection() {
  const [step, setStep] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
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
    if (currentIndex + 1 >= TRIVIA_TOTAL) {
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
    const pct = score / TRIVIA_TOTAL;
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
      <div className="max-w-md mx-auto text-center py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-6xl block mb-4">🌍</span>
          <h2 className="font-display font-bold text-3xl text-foreground mb-3">Animal Origins Trivia</h2>
          <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
            Test your knowledge of where animals and breeds come from! {TRIVIA_TOTAL} questions, instant feedback, and a final score.
          </p>
          <div className="flex items-center justify-center gap-6 mb-8 text-sm font-body text-muted-foreground">
            {[['❓', `${TRIVIA_TOTAL} Questions`], ['⚡', 'Instant Feedback'], ['🏆', 'Final Score']].map(([e, l]) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{e}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep('quiz')}
            className="bg-secondary text-secondary-foreground font-display font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-secondary/30">
            Start Quiz 🚀
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (step === 'results') {
    const { label, color } = getScoreLabel();
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Trophy className={`w-20 h-20 mx-auto mb-4 ${color}`} />
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">Quiz Complete!</h2>
          <p className={`font-display font-bold text-xl mb-6 ${color}`}>{label}</p>
          <div className="bg-card border border-border rounded-3xl p-8 mb-6">
            <p className="text-sm text-muted-foreground font-body mb-2">Your score</p>
            <p className="font-display font-bold text-6xl text-foreground">
              {score}<span className="text-2xl text-muted-foreground">/{TRIVIA_TOTAL}</span>
            </p>
            <div className="w-full bg-muted rounded-full h-3 mt-4">
              <motion.div className="bg-secondary h-3 rounded-full" initial={{ width: 0 }}
                animate={{ width: `${(score / TRIVIA_TOTAL) * 100}%` }} transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }} />
            </div>
            <p className="text-xs text-muted-foreground font-body mt-2">{Math.round((score / TRIVIA_TOTAL) * 100)}% correct</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRestart}
            className="flex items-center gap-2 mx-auto bg-secondary text-secondary-foreground font-display font-bold text-sm px-6 py-3 rounded-2xl">
            <RotateCcw className="w-4 h-4" /> Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-body text-muted-foreground">Question {currentIndex + 1} of {TRIVIA_TOTAL}</span>
        <span className="text-xs font-display font-bold text-secondary">{score} pts</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <motion.div className="bg-secondary h-2 rounded-full"
          animate={{ width: `${(currentIndex / TRIVIA_TOTAL) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={currentIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <div className="text-center mb-8">
            <span className="text-5xl block mb-4">{question.emoji}</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug">{question.question}</h2>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => {
              let style = "bg-card border-border text-foreground hover:border-secondary/40";
              if (answered) {
                if (i === question.correct) style = "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
                else if (i === selected) style = "bg-red-50 border-red-400 text-red-800 dark:bg-red-950 dark:text-red-300";
                else style = "bg-card border-border text-muted-foreground opacity-50";
              }
              return (
                <motion.button key={i} onClick={() => handleSelect(i)} disabled={answered}
                  whileHover={answered ? {} : { scale: 1.02 }} whileTap={answered ? {} : { scale: 0.98 }}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-body text-sm transition-all flex items-center justify-between gap-3 ${style}`}>
                  <span>{option}</span>
                  {answered && i === question.correct && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                  {answered && i === selected && i !== question.correct && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className={`rounded-2xl p-4 mb-6 border ${selected === question.correct ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800' : 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'}`}>
                  <p className="text-xs font-display font-bold text-muted-foreground mb-1">
                    {selected === question.correct ? '✅ Correct!' : '❌ Not quite!'}
                  </p>
                  <p className="text-sm font-body text-foreground leading-relaxed">{question.fact}</p>
                </div>
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNext}
                  className="w-full bg-secondary text-secondary-foreground font-display font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2">
                  {currentIndex + 1 >= TRIVIA_TOTAL ? '🏆 See Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Quiz Page ─────────────────────────────────────────────
const TABS = [
  { id: 'personality', label: '🎯 Which Critter Are You?' },
  { id: 'trivia', label: '🌍 Animal Origins Trivia' },
];

export default function Quiz() {
  const params = new URLSearchParams(window.location.search);
  const [activeTab, setActiveTab] = useState(params.get('tab') === 'trivia' ? 'trivia' : 'personality');

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">🧩</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-1">Quizzes</h1>
            <p className="text-sm text-muted-foreground font-body">Personality quiz or knowledge trivia — pick your challenge!</p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex gap-2 mt-6 bg-muted/60 rounded-2xl p-1.5 max-w-md mx-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-display font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'personality' ? <PersonalityQuiz /> : <TriviaQuizSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}