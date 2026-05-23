import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// Child routes that should show back button on mobile
const CHILD_ROUTES = ['/guides/'];

export default function MobileBackButton({ pageTitle }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isChildRoute = CHILD_ROUTES.some(prefix => pathname.startsWith(prefix) && pathname !== prefix.slice(0, -1));

  if (!isChildRoute) return null;

  return (
    /* Only rendered on mobile; parent Navbar hides logo when this mounts */
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="flex items-center gap-1 text-sm font-display font-semibold text-foreground hover:text-secondary transition-colors no-select"
    >
      <ChevronLeft className="w-5 h-5" />
      Back
    </button>
  );
}