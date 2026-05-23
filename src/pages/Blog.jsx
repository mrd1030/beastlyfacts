import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { client } from '@/lib/sanity';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { blogPosts as localPosts } from '@/lib/data/newsletters'; // ← Your original local articles

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
      "mainImage": mainImage.asset->url,
      publishedAt,
      category,
      tags,
      body
    }`;

    client.fetch(query).then(setSanityPosts);
  }, []);

  // Combine Sanity + Local posts
  const allPosts = [
    ...sanityPosts,
    ...localPosts.map(post => ({
      ...post,
      _id: post.id,           // Convert id to _id for consistency
      publishedAt: post.date, // Use date as publishedAt
      mainImage: null         // Local posts don't have images from Sanity
    }))
  ];

  const filtered = allPosts.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

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
              In-depth reptile and exotic pet guides, care tips, and husbandry deep-dives.
            </p>
          </motion.div>

          {/* Category filter */}
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
          {/* Posts */}
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPost(post)}
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
                    <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Subscribe box (keep your original) */}
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

            {/* Recent Articles */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3">Recent Articles</h3>
              <div className="space-y-3">
                {allPosts.slice(0, 4).map(post => (
                  <button
                    key={post._id}
                    onClick={() => setSelectedPost(post)}
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

// Keep your original PostView (with small update)
function PostView({ post, onBack }) {
  // For Sanity posts (has body)
  const sanityComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) return null;
        return (
          <img 
            src={value.asset.url} 
            alt={value.alt || ''} 
            className="w-full rounded-xl my-6 shadow-md" 
          />
        );
      }
    },
    block: {
      h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
      normal: ({ children }) => <p className="mb-4 text-[15px] text-muted-foreground leading-relaxed">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-secondary pl-4 italic my-6 text-muted-foreground">{children}</blockquote>
      )
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1 text-muted-foreground">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-1 text-muted-foreground">{children}</ol>
    }
  };

  // For original local posts (has content)
  const renderLocalContent = (content) => {
    return content.split('\n\n').map((block, i) => {
      const formatted = block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
      
      if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('**')) {
        return <h3 key={i} className="font-display font-bold text-xl mt-8 mb-4 text-foreground">{block.slice(2, -2)}</h3>;
      }
      
      return (
        <p 
          key={i} 
          className="mb-4 text-[15px] text-muted-foreground font-body leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
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

        <span className="text-5xl block mb-4">{post.emoji || '🦎'}</span>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-display font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
            {post.category || 'Article'}
          </span>
          <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
            <Clock className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="font-display font-bold text-3xl text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-muted-foreground font-body mb-8 leading-relaxed border-l-4 border-secondary pl-4 italic">
          {post.excerpt}
        </p>

        {post.mainImage && (
          <img 
            src={post.mainImage} 
            alt={post.title}
            className="w-full rounded-2xl mb-10 shadow-lg"
          />
        )}

        <div className="prose max-w-none">
          {post.body ? (
            // Sanity post
            <PortableText value={post.body} components={sanityComponents} />
          ) : (
            // Original local post
            renderLocalContent(post.content)
          )}
        </div>
      </div>
    </motion.div>
  );
}