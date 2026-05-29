import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeehiivSubscribe from '@/components/blog/BeehiivSubscribe';

export default function Newsletter() {

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
                            <BeehiivSubscribe />
                        </div>
                        
                    </div>
                </motion.div>
            </div>
        </section>
    );
}