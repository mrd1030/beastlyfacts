import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function BeehiivSubscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    // Open Beehiiv confirmation (they can close it if they want)
    const magicLink = `https://magic.beehiiv.com/v1/6c2e78bc-4fb8-4161-b91f-ee16f5ef259f?email=${encodeURIComponent(email)}&redirect_to=https://beastlyfacts.com`;
    window.open(magicLink, '_blank');

    // Show success immediately on your site
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
    }, 400);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="your@email.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
          required
        />

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold py-3 rounded-xl transition-all disabled:opacity-70"
        >
          {loading ? 'Please wait...' : 'Subscribe — it\'s free 🐾'}
        </button>
      </form>

      {/* Instant Success Popup */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center relative">
            <button
              onClick={() => setSuccess(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-display font-bold text-2xl mb-3">You're Subscribed!</h3>
            
            <p className="text-muted-foreground mb-6">
              Thank you! Your subscription is now active.<br />
              You'll start receiving the latest issues soon.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-3 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}