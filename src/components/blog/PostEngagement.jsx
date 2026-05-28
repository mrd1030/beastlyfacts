import React, { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, Send, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Generates/retrieves a stable anonymous session key for this browser
function getSessionKey() {
  let key = localStorage.getItem('bf_session_key');
  if (!key) {
    key = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('bf_session_key', key);
  }
  return key;
}

export default function PostEngagement({ postId, postTitle, postSlug }) {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sessionKey = getSessionKey();

  useEffect(() => {
    loadData();
  }, [postId]);

  const loadData = async () => {
    try {
      // Load likes
      const likes = await base44.entities.BlogPostLike.filter({ post_id: postId });
      setLikeCount(likes.length);
      setHasLiked(likes.some(l => l.session_key === sessionKey));

      // Load approved comments
      const allComments = await base44.entities.BlogComment.filter({ post_id: postId, status: 'approved' });
      setComments(allComments.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
    } catch (e) {
      // silent fail
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      await base44.entities.BlogPostLike.create({ post_id: postId, session_key: sessionKey });
      setLikeCount(c => c + 1);
      setHasLiked(true);
    } catch (e) {
      toast.error('Could not save like');
    }
  };

  const handleShare = async () => {
    const url = `https://beastlyfacts.com/blog?post=${postSlug || postId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: postTitle, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;
    setSubmitting(true);
    try {
      await base44.functions.invoke('submitBlogComment', {
        post_id: postId,
        post_title: postTitle,
        author_name: name,
        author_email: email,
        content: commentText,
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setCommentText('');
    } catch (e) {
      toast.error(e.message || 'Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-border pt-8 space-y-10">
      {/* Like & Share bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={hasLiked}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-display font-semibold text-sm ${
            hasLiked
              ? 'bg-hotpink/10 border-hotpink/30 text-hotpink cursor-default'
              : 'bg-card border-border text-muted-foreground hover:border-hotpink/40 hover:text-hotpink'
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-hotpink text-hotpink' : ''}`} />
          {likeCount > 0 ? likeCount : ''} {hasLiked ? 'Liked!' : 'Like'}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-muted-foreground hover:border-secondary/40 hover:text-secondary transition-all font-display font-semibold text-sm"
        >
          {shared ? <Check className="w-4 h-4 text-accent" /> : <Share2 className="w-4 h-4" />}
          {shared ? 'Copied!' : 'Share'}
        </button>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body ml-auto">
          <MessageCircle className="w-3.5 h-3.5" />
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </div>
      </div>

      {/* Comments section */}
      <div>
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Comments
        </h3>

        {/* Existing comments */}
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body mb-6">No comments yet — be the first!</p>
        ) : (
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {comments.map(c => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted/40 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-display font-bold text-sm text-foreground">{c.author_name}</span>
                    <span className="text-xs text-muted-foreground font-body">
                      {new Date(c.created_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">{c.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Comment form */}
        {submitted ? (
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 text-center">
            <span className="text-2xl block mb-2">🐾</span>
            <p className="font-display font-bold text-sm text-foreground">Thanks for your comment!</p>
            <p className="text-xs text-muted-foreground font-body mt-1">It'll show up once approved.</p>
            <button onClick={() => setSubmitted(false)} className="text-xs text-secondary mt-3 underline font-body">
              Leave another comment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitComment} className="space-y-3 bg-card border border-border rounded-2xl p-5">
            <p className="font-display font-bold text-sm text-foreground">Leave a comment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Your name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="font-body text-sm"
              />
              <Input
                placeholder="Email (optional, not shown)"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="font-body text-sm"
              />
            </div>
            <textarea
              placeholder="Write your comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-body placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            <Button
              type="submit"
              disabled={submitting || !name.trim() || !commentText.trim()}
              className="font-display font-bold"
            >
              {submitting ? 'Submitting...' : <><Send className="w-4 h-4 mr-1.5" /> Submit Comment</>}
            </Button>
            <p className="text-xs text-muted-foreground font-body">Comments are moderated before appearing.</p>
          </form>
        )}
      </div>
    </div>
  );
}