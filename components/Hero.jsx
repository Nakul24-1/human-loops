"use client"

import { motion } from 'framer-motion'
import { LoopAnimation } from './loop-animation'

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <div>
                <motion.div className="hero-tag" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    Your Loop. Our Humans.
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
                    The Human Layer<br /><em>Your AI Can&apos;t Skip.</em>
                </motion.h1>
                <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                    We handle the <strong>verification, labelling and QA</strong> your AI workflow needs — so models improve, outputs stay clean, and your team ships faster.
                </motion.p>
                <motion.div className="hero-btns" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}>
                    <a href="https://calendly.com/shloak/introductory-call" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Call →</a>
                    <a href="#pos" className="btn-secondary">How It Works</a>
                </motion.div>
            </div>
            <motion.div className="hero-right" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="hero-loop-label">How the Loop Works</div>
                <LoopAnimation />
            </motion.div>
        </section>
    )
}
