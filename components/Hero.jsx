"use client"

import { motion } from 'framer-motion'
import { CALENDLY_URL } from '@/lib/constants'

const STATS = [
    { num: '105,000+', label: 'Hours of physical world data collected' },
    { num: '65+', label: 'People, all in house, all on payroll' },
    { num: '0', label: 'Work subcontracted or outsourced' },
]

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                Your robots. Our data.
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
                Physical AI starts with<br /><em>physical data.</em>
            </motion.h1>

            <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                We collect, teleoperate, annotate, and validate the data that physical AI models need to work in the real world. Every project runs in our facility, with our team, <strong>end to end</strong>.
            </motion.p>

            <motion.div className="hero-stats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
                {STATS.map((s, i) => (
                    <div key={i}>
                        <div className="hero-stat-num">{s.num}</div>
                        <div className="hero-stat-label">{s.label}</div>
                    </div>
                ))}
            </motion.div>

            <motion.div className="hero-btns" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Call →</a>
                <a href="#how" className="btn-secondary">See How It Works</a>
            </motion.div>
        </section>
    )
}
