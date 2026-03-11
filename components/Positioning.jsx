"use client"

import AnimatedSection from './AnimatedSection'

export default function Positioning() {
    const cards = [
        { title: 'New-Age BPO', text: <>Purpose-built for AI-era workflows. The ops layer that legacy <b>BPOs can&apos;t offer</b> and AI companies <b>can&apos;t build in-house.</b></> },
        { title: 'Closes the Last Mile', text: <>AI gets you <b>90% there. We close the gap</b> — catching errors, resolving edge cases, feeding every correction back into your models in important and regulated industries.</> },
        { title: 'Built for Complexity', text: <>Finance documents, clinical workflows, robotics annotations, insurance claims — wherever <b>data is complex</b> and the <b>stakes are high,</b> our ops teams go deep.</> },
    ]

    return (
        <section id="pos">
            <AnimatedSection><div className="section-tag">What We Are</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Where AI Workflows Meet<br />Human Validation.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="pos-grid">
                    {cards.map((c, i) => (
                        <div className="card" key={i}>
                            <div className="pos-title">{c.title}</div>
                            <div className="pos-text">{c.text}</div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </section>
    )
}
