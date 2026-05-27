import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, ChevronDown, BookOpen, Search } from 'lucide-react';
import { useDarkMode, useDailyStreak } from '@/lib/hooks/useLocalStorage';
import { encyclopediaCategories } from '@/lib/data/encyclopedia';
import MobileBackButton from './MobileBackButton';
import DonateButton from '@/components/DonateButton';

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/facts', label: 'Facts' },
  { to: '/blog', label: 'Critter Digest' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/pack', label: 'My Pack' },
];

export default function Navbar() {
  const [dark, setDark] = useDarkMode();
  const { streak, recordVisit } = useDailyStreak();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const megaRef = useRef(null);

  useEffect(() => { recordVisit(); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isEncyclopedia = location.pathname.startsWith('/encyclopedia') || location.pathname.startsWith('/guides');
  // Detect child routes where mobile should show back button
  const isChildRoute = /^\/guides\/.+/.test(location.pathname);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-safe-top ${
        scrolled
          ? 'bg-card/95 backdrop-blur-xl shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-14">
          {/* Logo — hidden on mobile child routes; replaced by back button */}
          <Link to="/" className={`items-center gap-2 flex-shrink-0 ${isChildRoute ? 'hidden md:flex' : 'flex'}`}>
            <motion.span className="text-xl" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
              🦁
            </motion.span>
            <span className="font-display font-bold text-base text-foreground">
              Beastly<span className="text-secondary">Facts</span>
            </span>
          </Link>
          {/* Mobile-only back button for child routes */}
          <div className={`md:hidden ${isChildRoute ? 'flex' : 'hidden'}`}>
            <MobileBackButton />
          </div>

          {/* Mobile child route: centered page title */}
          {isChildRoute && (
            <div className="md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="font-display font-bold text-sm text-foreground">Care Guide</span>
            </div>
          )}

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {primaryLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all ${
                  location.pathname === link.to
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Encyclopedia mega dropdown */}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={`px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all flex items-center gap-1 ${
                  isEncyclopedia
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Encyclopedia
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl shadow-foreground/10 overflow-hidden"
                  >
                    <div className="p-3 border-b border-border">
                      <Link
                        to="/encyclopedia"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
                      >
                        <Search className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="font-display font-bold text-xs text-foreground">Browse All Animals</p>
                          <p className="text-xs text-muted-foreground font-body">Search the full encyclopedia</p>
                        </div>
                      </Link>
                      <Link
                        to="/guides"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-accent" />
                        <div>
                          <p className="font-display font-bold text-xs text-foreground">Care Guides</p>
                          <p className="text-xs text-muted-foreground font-body">Detailed husbandry guides</p>
                        </div>
                      </Link>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-display font-bold text-muted-foreground px-1 mb-2">Browse by Category</p>
                      <div className="grid grid-cols-2 gap-1">
                        {encyclopediaCategories.map(cat => (
                          <Link
                            key={cat.name}
                            to={`/encyclopedia?category=${encodeURIComponent(cat.name)}`}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-muted transition-colors"
                          >
                            <span className="text-base">{cat.emoji}</span>
                            <span className="text-xs font-body text-foreground">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <DonateButton className="hidden md:flex h-8 text-xs px-3 font-display font-bold" />
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden sm:flex items-center gap-1 bg-secondary/10 text-secondary font-display font-bold text-xs px-2 py-1 rounded-full"
              >
                🔥 {streak}
              </motion.div>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark
                ? <Sun className="w-4 h-4 text-sunny" />
                : <Moon className="w-4 h-4 text-muted-foreground" />
              }
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {primaryLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-semibold transition-all ${
                    location.pathname === link.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Encyclopedia section */}
              <div className="pt-2 pb-1">
                <p className="text-xs font-display font-bold text-muted-foreground px-4 mb-2 uppercase tracking-wide">Encyclopedia</p>
                <Link
                  to="/encyclopedia"
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-semibold transition-all ${
                    location.pathname === '/encyclopedia' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Search className="w-4 h-4" /> Browse All Animals
                </Link>
                <Link
                  to="/guides"
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-semibold transition-all ${
                    location.pathname === '/guides' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> Care Guides
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-1 px-1 pt-1">
                {encyclopediaCategories.map(cat => (
                  <Link
                    key={cat.name}
                    to={`/encyclopedia?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}