"use client"

import AnimatedSection from './AnimatedSection'

export default function Positioning() {
    const cards = [
        { title: 'Built for complexity', text: <>Finance documents, clinical workflows, robotics annotations — wherever <b>data is complex</b> and the <b>stakes are high,</b> our ops teams go deep.</> },
        { title: '100% On-site Teams', text: <>We hire 100% full-time, on-site annotators and labelers, ensuring <b>100% oversight</b>, data security, and maximum productivity.</> },
        { title: 'Pre-model data processing or RLHF', text: <>From sorting raw data to complex RLHF, our specialized on-site teams grow into subject matter experts, managing your entire pipeline end-to-end because we hire <b>full-time & on-site.</b></> },
    ]

    return (
        <section id="pos">
            <AnimatedSection><div className="section-tag">What we do Different</div></AnimatedSection>
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
