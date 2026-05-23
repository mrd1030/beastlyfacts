import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Printer, Check, ChevronRight } from 'lucide-react';
import { guidesExtended } from '@/lib/data/guidesExtended';
import { difficultyColor } from '@/lib/data/encyclopedia';

const tabLabels = {
  housing: '🏠 Housing',
  diet: '🥗 Diet',
  enrichment: '🎮 Enrichment',
  health: '💊 Health',
};

export default function GuideDetail() {
  const { id } = useParams();
  const guide = guidesExtended.find(g => g.id === id);
  const [activeTab, setActiveTab] = useState('housing');

  const handlePrint = () => {
    const printContent = guide.sections.checklist.map(item => `☐  ${item}`).join('\n');
    const w = window.open('', '_blank');
    w.document.write(`<pre style="font-family:sans-serif;font-size:13px;line-height:2.2;padding:24px;">${guide.emoji} ${guide.name} — Care Checklist\n${'─'.repeat(45)}\n\n${printContent}</pre>`);
    w.document.close();
    w.print();
  };

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-3">🔍</span>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Guide not found</h2>
          <Link to="/encyclopedia" className="text-secondary text-sm font-display font-semibold hover:underline">
            Browse the encyclopedia →
          </Link>
        </div>
      </div>
    );
  }

  const diffClass = difficultyColor[guide.difficulty] || 'text-muted-foreground bg-muted';

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* Back */}
        <Link
          to="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Encyclopedia
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{guide.emoji}</span>
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                  {guide.name}
                </h1>
                <p className="text-sm text-muted-foreground font-body mt-0.5">{guide.petType}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs font-display font-semibold px-2.5 py-0.5 rounded-full ${diffClass}`}>
                    {guide.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-display font-semibold text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-2 rounded-xl transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Checklist
            </button>
          </div>

          <p className="text-base text-foreground font-body italic mb-4">{guide.tagline}</p>

          {/* Fun fact */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 mb-6">
            <p className="text-sm font-body text-foreground">
              <span className="font-display font-bold text-secondary">🤓 Did you know?</span>{' '}
              {guide.funFact}
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-5">
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-2 rounded-xl text-xs font-display font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card border border-border rounded-2xl p-5 mb-6"
          >
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {guide.sections[activeTab]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Checklist */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
            ✅ Complete Care Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {guide.sections.checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground font-body bg-muted/50 rounded-xl p-2.5">
                <Check className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Back to browse */}
        <div className="mt-8 flex items-center gap-2 text-sm font-display font-semibold text-muted-foreground">
          <Link to="/encyclopedia" className="hover:text-secondary transition-colors flex items-center gap-1">
            Browse all animals <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}