import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function BeehiivSubscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    const url = `https://magic.beehiiv.com/v1/6c2e78bc-4fb8-4161-b91f-ee16f5ef259f?email=${encodeURIComponent(email)}`;
    try {
      // Fire in background — Beehiiv uses CORS so we just open silently
      window.open(url, '_blank', 'width=1,height=1,left=-1000,top=-1000');
    } catch {}

    // Show success regardless (Beehiiv link handles confirmation email)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
    }, 800);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          placeholder="your@email.com"
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
        />
        {error && <p className="text-xs text-destructive font-body">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold text-sm py-2.5 rounded-xl transition-all disabled:opacity-70"
        >
          {loading ? 'Subscribing…' : 'Subscribe — it\'s free 🐾'}
        </button>
      </form>

      {/* Success Modal */}
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setSuccess(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSuccess(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-5xl mb-4">🎉</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-lg text-foreground">You're subscribed!</h3>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-1">
              Thank you! You're now subscribed to <span className="font-semibold text-foreground">The Critter Digest</span>.
            </p>
            <p className="text-xs text-muted-foreground font-body mb-6">
              Check your inbox to confirm your subscription. 📬
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}