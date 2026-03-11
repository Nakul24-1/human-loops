"use client"

import AnimatedSection from './AnimatedSection'

export default function Team() {
    return (
        <section id="team">
            <AnimatedSection><div className="section-tag">The Team</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>The Loop Has a Home.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="team-grid">
                    <div className="photo-slot tall"><span className="photo-label">Office — Wide Shot</span></div>
                    <div className="photo-slot"><span className="photo-label">Team at Work</span></div>
                    <div className="photo-slot"><span className="photo-label">Leadership</span></div>
                    <div className="photo-slot"><span className="photo-label">Team at Work 2</span></div>
                    <div className="photo-slot"><span className="photo-label">Culture Moment</span></div>
                </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}><p className="team-caption">43 people. Growing at pace.</p></AnimatedSection>
        </section>
    )
}
