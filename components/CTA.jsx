"use client"

import AnimatedSection from './AnimatedSection'

export default function CTA() {
    return (
        <section id="cta" className="cta-section">
            <AnimatedSection><h2>Ready to Close<br />the Loop?</h2></AnimatedSection>
            <AnimatedSection delay={0.1}><p className="cta-sub">One call. No decks. Just a conversation about what you need.</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <a href="https://calendly.com/shloak/introductory-call" target="_blank" rel="noopener noreferrer" className="cta-btn-primary">Book a Discovery Call →</a>
            </AnimatedSection>
        </section>
    )
}
