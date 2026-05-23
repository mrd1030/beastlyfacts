import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';

export default function CritterDigestPreview() {
  const preview = blogPosts.slice(0, 3);

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <span className="text-2xl block mb-1">📰</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              The Critter Digest
            </h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Care guides, deep-dives, and husbandry tips from our blog
            </p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-1 text-xs font-display font-semibold text-secondary hover:underline flex-shrink-0">
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {preview.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to="/blog">
                <div className="bg-card border border-border rounded-2xl p-4 hover:border-secondary/40 hover:shadow-md transition-all group h-full flex flex-col">
                  <span className="text-2xl mb-3 block">{post.emoji}</span>
                  <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full w-fit mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-foreground mb-2 group-hover:text-secondary transition-colors leading-snug flex-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-body mt-auto">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-5 sm:hidden">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-display font-bold text-secondary">
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}