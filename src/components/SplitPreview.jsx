import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { urlFor } from '@/lib/sanityImage';

export default function SplitPreview({ post }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('splitpreview_dark') === 'true';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('splitpreview_dark', isDark);
  }, [isDark]);

  const mainImageUrl = post?.mainImage?.asset
    ? urlFor(post.mainImage).width(800).url()
    : null;

  return (
    <div className="min-h-screen overflow-auto bg-background font-body p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">

        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-border">
          <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest">
            Preview
          </span>
          <button
            onClick={() => setIsDark(d => !d)}
            className="flex items-center gap-2 text-xs font-display font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border bg-card"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>

        {/* Content */}
        {!post ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground font-body text-sm">
            Start writing to see a preview…
          </div>
        ) : (
          <>
            {/* Category + date */}
            <div className="flex items-center gap-2 mb-3">
              {post.category && (
                <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              )}
              {post.publishedAt && (
                <span className="text-xs text-muted-foreground font-body">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl text-foreground mb-6 leading-tight">
              {post.title || 'Untitled'}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-sm text-muted-foreground font-body mb-8 leading-relaxed border-l-4 border-secondary pl-4 italic">
                {post.excerpt}
              </p>
            )}

            {/* Main image */}
            {mainImageUrl && (
              <img
                src={mainImageUrl}
                alt={post.title || 'Post image'}
                className="w-full rounded-2xl mb-10 shadow-lg"
              />
            )}

            {/* Body */}
            {post.body ? (
              <div className="prose max-w-none">
                <PortableTextRenderer content={post.body} />
              </div>
            ) : (
              <p className="text-center text-muted-foreground font-body text-sm">
                Start writing to see a preview…
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}