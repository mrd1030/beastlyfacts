import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Send, Check, X } from 'lucide-react';
import { blogPosts, blogCategories } from '@/lib/data/newsletters';
import confetti from 'canvas-confetti';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = blogPosts.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 }, colors: ['#FF8C42', '#00B8A9', '#FFD93D'] });
  };

  if (selectedPost) {
    return <PostView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">📰</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-1">
              The Critter Digest
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-lg">
              In-depth reptile and exotic pet guides, care tips, and husbandry deep-dives. Updated regularly.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mt-5">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="bg-card border border-border rounded-2xl p-5 cursor-pointer hover:border-secondary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{post.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-base text-foreground mb-1.5 group-hover:text-secondary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-muted-foreground font-body bg-muted rounded-md px-2 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <span className="text-3xl block mb-2">📭</span>
                <p className="font-display font-bold text-foreground">No posts in this category yet.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Subscribe */}
                      <div className="bg-card border border-border rounded-2xl p-6">
                          <h3 className="font-display font-bold text-base text-foreground mb-1">
                              Subscribe — it's free
                          </h3>
                          <p className="text-xs text-muted-foreground font-body mb-4">
                              New articles straight to your inbox. No spam, ever. 🐾
                          </p>

                          <div className="bg-muted/50 border border-dashed border-border rounded-xl p-8 text-center">
                              <div className="text-4xl mb-3">🔨</div>
                              <h4 className="font-display font-bold text-lg mb-2">The Critter Digest is coming soon!</h4>
                              <p className="text-sm text-muted-foreground">
                                  We're working hard to get the newsletter ready.<br />
                                  Subscribe button will be back very soon!
                              </p>
                          </div>
                      </div>

            {/* Recent posts */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3">Recent Articles</h3>
              <div className="space-y-3">
                {blogPosts.slice(0, 4).map(post => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="w-full text-left flex items-start gap-2.5 group"
                  >
                    <span className="text-lg flex-shrink-0">{post.emoji}</span>
                    <p className="text-xs font-body text-muted-foreground group-hover:text-foreground transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3">Topics</h3>
              <div className="flex flex-wrap gap-1.5">
                {blogCategories.slice(1).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full transition-all border ${
                      activeCategory === cat
                        ? 'bg-secondary text-secondary-foreground border-transparent'
                        : 'bg-transparent border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostView({ post, onBack }) {
  // Render markdown-like content
  const renderContent = (content) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('**')) {
        return <h3 key={i} className="font-display font-bold text-base text-foreground mt-5 mb-2">{block.slice(2, -2)}</h3>;
      }
      // Bold within text
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-display font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Critter Digest
        </button>

        <span className="text-5xl block mb-4">{post.emoji}</span>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
          <span className="text-xs text-muted-foreground font-body">{post.date}</span>
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed border-l-2 border-secondary pl-3 italic">
          {post.excerpt}
        </p>

        <div className="prose-sm max-w-none">
          {renderContent(post.content)}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-border">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-body text-muted-foreground bg-muted rounded-md px-2.5 py-1 flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
