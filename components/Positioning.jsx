"use client"

import AnimatedSection from './AnimatedSection'

export default function Positioning() {
    const cards = [
        { title: 'Built for complexity', text: <>Finance documents, clinical workflows, robotics annotations — wherever <b>data is complex</b> and the <b>stakes are high,</b> our ops teams go deep.</> },
        { title: '100% On-site Teams', text: <>We hire 100% full time, on-site annotators and labellers to have <b>100% oversight</b> and protection of data and highest level of productivity.</> },
        { title: 'Pre-model data processing or RHLF', text: <>We do it all, we have specialised teams in sorting the raw data and same data later becomes data matter experts to do RHLF, we can do it as we hire <b>Full Time & on-site.</b></> },
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
