"use client"

import AnimatedSection from './AnimatedSection'
import { CALENDLY_URL } from '@/lib/constants'

export default function CTA() {
    return (
        <section id="contact" className="cta-section">
            <AnimatedSection><div className="section-tag">Let&apos;s talk</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Ready to build with us?</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="cta-sub">One call. No decks. Just a conversation about what you need and what we can do.</p></AnimatedSection>
            <AnimatedSection delay={0.25}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="cta-btn-primary">Book a Discovery Call →</a>
            </AnimatedSection>
        </section>
    )
}
