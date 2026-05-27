import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA4 from 'react-ga4';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
      ReactGA4.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null;
}