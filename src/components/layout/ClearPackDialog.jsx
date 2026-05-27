import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritesCtx } from '@/lib/FavoritesContext';

export default function ClearPackDialog() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [clearing, setClearing] = useState(false);
  const [done, setDone] = useState(false);
  const { clearFavorites } = useFavoritesCtx();

  const isConfirmed = confirmText.trim().toUpperCase() === 'CLEAR';

  const handleClear = async () => {
    if (!isConfirmed) return;
    setClearing(true);
    await new Promise(r => setTimeout(r, 800));
    clearFavorites();
    setDone(true);
    setClearing(false);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmText('');
    setDone(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="no-select flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive font-display font-semibold text-sm hover:bg-destructive/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Clear Your Pack
      </button>

      {/* Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
            onClick={() => !clearing && handleClose()}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {done ? (
                <div className="text-center py-4">
                  <span className="text-5xl block mb-3">🧹</span>
                  <h2 className="font-display font-bold text-lg text-foreground mb-1">Pack Cleared</h2>
                  <p className="text-sm text-muted-foreground font-body">Your saved facts have been removed.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base text-foreground">Clear Your Pack</h2>
                      <p className="text-xs text-muted-foreground font-body">This will remove all saved facts</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
                    All your favorite facts will be permanently removed from your pack. You can always save them again later.
                  </p>

                  <label className="block text-xs font-display font-semibold text-muted-foreground mb-1.5">
                    Type <span className="text-destructive font-bold">CLEAR</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={e => setConfirmText(e.target.value)}
                    placeholder="CLEAR"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-destructive/40 text-foreground placeholder:text-muted-foreground mb-4"
                    autoComplete="off"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleClose}
                      className="no-select flex-1 py-2.5 rounded-xl border border-border text-sm font-display font-semibold text-muted-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClear}
                      disabled={!isConfirmed || clearing}
                      className="no-select flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-display font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      {clearing ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Trash2 className="w-4 h-4" /> Clear</>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}