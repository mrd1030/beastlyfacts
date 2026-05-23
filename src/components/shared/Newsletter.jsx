import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return;

        try {
            const formData = new FormData();
            formData.append('fields[email]', email);
            formData.append('ml-submit', '1');
            formData.append('anticsrf', 'true');

            // Submit to MailerLite
            await fetch('https://assets.mailerlite.com/jsonp/2372560/forms/188211000791533545/subscribe', {
                method: 'POST',
                body: formData,
            });

            // Show success
            setSubscribed(true);
            setEmail(''); // Clear input

            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.7 },
                colors: ['#FF8C42', '#00B8A9', '#FFD93D', '#E8336D']
            });

        } catch (error) {
            console.error('Subscription error:', error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="py-14 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary/5 via-card to-secondary/5 border border-border rounded-3xl p-8 sm:p-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                        {/* Left: Blog promo */}
                        <div>
                            <span className="text-3xl block mb-3">📰</span>
                            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                                The Critter Digest
                            </h2>
                            <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
                                Our blog and newsletter in one place. In-depth reptile care guides, husbandry deep-dives, species spotlights, and expert tips — delivered to your inbox and published here.
                            </p>
                            <div className="flex flex-col gap-2 mb-5">
                                {[
                                    "🦎 Gecko & reptile husbandry deep-dives",
                                    "☀️ UVB lighting & supplementation guides",
                                    "🌿 Bioactive enclosure walkthroughs",
                                    "🩺 Health & vet care tips",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                                        <span className="text-base leading-none mt-0.5">{item.split(' ')[0]}</span>
                                        <span>{item.split(' ').slice(1).join(' ')}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/blog">
                                <motion.button
                                    whileHover={{ x: 3 }}
                                    className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-secondary hover:underline"
                                >
                                    Browse all articles <ArrowRight className="w-3.5 h-3.5" />
                                </motion.button>
                            </Link>
                        </div>

                        {/* Right: Subscribe form */}
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
                        
                    </div>
                </motion.div>
            </div>
        </section>
    );
}