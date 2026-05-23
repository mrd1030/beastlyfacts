import React from 'react';
import { Link } from 'react-router-dom';
import SiteCounter from '@/components/shared/SiteCounter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦁</span>
              <span className="font-display font-bold text-base">
                Beastly<span className="text-secondary">Facts</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">
              Facts that roar. Guides that care.<br />
              For reptile keepers and animal lovers everywhere.
            </p>
            <SiteCounter />
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wide text-muted-foreground mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/facts', label: 'Fun Facts' },
                { to: '/quiz', label: 'Personality Quiz' },
                { to: '/pack', label: 'My Beast Pack' },
                { to: '/blog', label: 'Critter Digest' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Encyclopedia */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wide text-muted-foreground mb-3">Encyclopedia</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/encyclopedia', label: 'Browse All' },
                { to: '/guides', label: 'Care Guides' },
                { to: '/encyclopedia?category=Geckos', label: 'Geckos' },
                { to: '/encyclopedia?category=Snakes', label: 'Snakes' },
                { to: '/encyclopedia?category=Lizards', label: 'Lizards' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wide text-muted-foreground mb-3">About</h4>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              All information is for educational purposes. Always research thoroughly before adopting any exotic pet. 🌿
            </p>
            <div className="mt-3">
              <Link to="/blog" className="text-xs font-display font-semibold text-secondary hover:underline">
                📰 Subscribe to Critter Digest →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground font-body">
            © {year} BeastlyFacts.com — No animals were harmed in the making of this website 🐾
          </p>
          <div className="flex items-center gap-4">
            <Link to="/encyclopedia" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
              Encyclopedia
            </Link>
            <Link to="/blog" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
              Blog
            </Link>
            <Link to="/guides" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
              Guides
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}