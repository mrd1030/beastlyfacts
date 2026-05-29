import React, { useEffect } from 'react';

export default function BeehiivSubscribe() {
  useEffect(() => {
    // Inject the Beehiiv loader script once
    if (!document.querySelector('script[data-beehiiv-form]')) {
      const script = document.createElement('script');
      script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
      script.async = true;
      script.setAttribute('data-beehiiv-form', '3e7bc205-739d-43a2-8468-7718e54540f5');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div data-beehiiv-form="3e7bc205-739d-43a2-8468-7718e54540f5" />
      <p className="text-[10px] text-center text-muted-foreground mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}