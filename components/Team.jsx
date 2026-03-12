"use client"

import AnimatedSection from './AnimatedSection'
import Image from 'next/image'

export default function Team() {
    return (
        <section id="team">
            <AnimatedSection><div className="section-tag">The Team</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>The Loop Has a Home.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="team-grid">
                    <div className="photo-slot tall">
                        <Image src="/398b49a8-2474-4bfa-82c6-73bee8d2af8c.jpg" alt="Office Wide Shot" fill className="photo-img" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="photo-slot">
                        <Image src="/IMG_0124.png" alt="Human Loops Logo Wall" fill className="photo-img" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="photo-slot">
                        <Image src="/c0619a9a-6cf9-4399-a29b-47b31958e284.jpg" alt="Conference Room" fill className="photo-img" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="photo-slot wide">
                        <Image src="/IMG_9669.jpg" alt="Team Culture" fill className="photo-img" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}><p className="team-caption">43 people. Growing at pace.</p></AnimatedSection>
        </section>
    )
}
