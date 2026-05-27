import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, BookOpen, Compass, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/',            label: 'Home',    icon: Home },
  { to: '/facts',       label: 'Facts',   icon: Compass },
  { to: '/encyclopedia',label: 'Browse',  icon: Layers },
  { to: '/blog',        label: 'Critter Digest',  icon: BookOpen },
  { to: '/pack',        label: 'My Pack', icon: Heart },
];

export default function BottomTabs() {
  const { pathname } = useLocation();

  return (
    /* md:hidden = only visible on mobile */
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border no-select"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch h-14">
        {tabs.map(({ to, label, icon: Icon }) => {
          // Mark active: exact for home, startsWith for others
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            >
              {active && (
                <motion.div
                  layoutId="bottom-tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-secondary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${active ? 'text-secondary' : 'text-muted-foreground'}`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className={`text-[10px] font-display font-semibold transition-colors ${
                  active ? 'text-secondary' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}