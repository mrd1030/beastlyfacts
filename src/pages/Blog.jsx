import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { client } from '@/lib/sanity';
import groq from 'groq';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { blogPosts as localPosts } from '@/lib/data/newsletters';
import PostEngagement from '@/components/blog/PostEngagement';
import BeehiivSubscribe from '@/components/blog/BeehiivSubscribe';
import PostSidebar from '@/components/blog/PostSidebar';
import { urlFor } from '@/lib/sanityImage';

export default function Blog() {
  const [sanityPosts, setSanityPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch from Sanity
  useEffect(() => {
    const query = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      animalType,
      readTime,
      body,
      "category": categories[0]->title
    }`;

    client.fetch(query).then(posts => {
      setSanityPosts(posts);
      // Open post from URL param ?post=slug
      const urlParams = new URLSearchParams(window.location.search);
      const postParam = urlParams.get('post');
      if (postParam && !selectedPost) {
        const match = posts.find(p => p.slug?.current === postParam || p._id === postParam)
          || localPosts.find(p => p.id === postParam);
        if (match) setSelectedPost({ ...match, _id: match._id || match.id, publishedAt: match.publishedAt || match.date, mainImage: match.mainImage || null });
      }
    }).catch(console.error);
  }, []);

  // Combine Sanity + Local posts
  const allPosts = [
    ...sanityPosts,
    ...localPosts.map(post => ({
      ...post,
      _id: post.id,
      publishedAt: post.date,
      mainImage: null
    }))
  ];

  const filtered = allPosts.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

  const handleBack = () => {
    setSelectedPost(null);
    const url = new URL(window.location);
    url.searchParams.delete('post');
    window.history.replaceState({}, '', url);
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    const url = new URL(window.location);
    url.searchParams.set('post', post.slug?.current || post._id || post.id);
    window.history.pushState({}, '', url);
  };

  if (selectedPost) {
    return <PostView post={selectedPost} onBack={handleBack} allPosts={allPosts} onSelectPost={handleSelectPost} />;
  }


  return (
    <div className="min-h-screen">
      {/* Header - Unchanged */}
      <div className="bg-gradient-to-b from-secondary/5 to-transparent pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-3xl mb-2 block">📰</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-1">
              The Critter Digest
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-lg">
              In-depth reptile and exotic pet guides, care tips, and husbandry deep-dives.
            </p>
          </motion.div>

          {/* Category filter - Unchanged */}
          <div className="flex flex-wrap gap-2 mt-5">
            {['All', 'Care Tips', 'Reptiles', 'Husbandry'].map(cat => (
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
          {/* Posts - Unchanged layout */}
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelectedPost(post);
                  const url = new URL(window.location);
                  url.searchParams.set('post', post.slug?.current || post._id || post.id);
                  window.history.pushState({}, '', url);
                }}
                className="bg-card border border-border rounded-2xl p-5 cursor-pointer hover:border-secondary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        {post.category || 'Article'}
                      </span>
                      <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3 mb-2">
                      {post.excerpt}
                    </p>
                    {post.readTime && (
                      <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar - Unchanged */}
          <div className="space-y-5">
            {/* Subscribe box */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display font-bold text-base text-foreground mb-1">
                Subscribe — it's free
              </h3>
              <p className="text-xs text-muted-foreground font-body mb-4">
                New articles straight to your inbox. No spam, ever. 🐾
              </p>
              <BeehiivSubscribe />
            </div>

            {/* Recent Articles - Unchanged */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3">Recent Articles</h3>
              <div className="space-y-3">
                {allPosts.slice(0, 4).map(post => (
                  <button
                    key={post._id}
                    onClick={() => {
                      setSelectedPost(post);
                      const url = new URL(window.location);
                      url.searchParams.set('post', post.slug?.current || post._id || post.id);
                      window.history.pushState({}, '', url);
                    }}
                    className="w-full text-left flex items-start gap-2.5 group"
                  >
                    <span className="text-lg flex-shrink-0">🦎</span>
                    <p className="text-xs font-body text-muted-foreground group-hover:text-foreground transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </p>
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

// Renders local markdown-style content (bold, bullets, headings, paragraphs)
function LocalPostContent({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    // Bold heading lines like **Title**
    if (/^\*\*(.+)\*\*$/.test(line)) {
      const text = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
      elements.push(
        <h3 key={i} className="font-display font-bold text-lg text-foreground mt-6 mb-2">{text}</h3>
      );
      i++; continue;
    }

    // Bullet points
    if (line.startsWith('- ')) {
      const bullets = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        bullets.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 mb-4 space-y-1.5 text-muted-foreground font-body text-sm leading-relaxed">
          {bullets.map((b, bi) => <li key={bi}>{b}</li>)}
        </ul>
      );
      continue;
    }

    // Normal paragraph — inline bold support
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) => {
      if (/^\*\*(.+)\*\*$/.test(part)) {
        return <strong key={pi} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    elements.push(
      <p key={i} className="mb-4 leading-relaxed text-muted-foreground font-body text-sm">{parts}</p>
    );
    i++;
  }

  return <div className="space-y-0">{elements}</div>;
}

// PostView
function PostView({ post, onBack, allPosts, onSelectPost }) {
  // Intercept browser back button to go back to the list, not previous page
  React.useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => onBack();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onBack]);

  const handleSidebarSelect = (p) => {
    onSelectPost(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content */}
          <div className="lg:col-span-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-display font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Critter Digest
            </button>

            <span className="text-5xl block mb-4">{post.emoji || '🦎'}</span>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                {post.category || 'Article'}
              </span>
              <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              {post.readTime && (
                <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime} min read
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-3xl text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-sm text-muted-foreground font-body mb-8 leading-relaxed border-l-4 border-secondary pl-4 italic">
              {post.excerpt}
            </p>

            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).width(800).url()}
                alt={post.title}
                className="w-full rounded-2xl mb-10 shadow-lg"
              />
            )}

            <div className="prose max-w-none">
              {post.body ? (
                <PortableTextRenderer content={post.body} />
              ) : (
                <LocalPostContent content={post.content || ''} />
              )}
            </div>

            <PostEngagement postId={post._id || post.id} postTitle={post.title} postSlug={post.slug?.current || post.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6">
            <PostSidebar allPosts={allPosts} currentPost={post} onSelectPost={handleSidebarSelect} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}