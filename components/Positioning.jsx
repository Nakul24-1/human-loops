"use client"

import AnimatedSection from './AnimatedSection'

const CARDS = [
    {
        num: '01',
        title: 'Specialists, not generalists',
        text: <>Egocentric capture, teleoperation, and multimodal annotation are not side offerings. They are what we go deep on. Our operators train on <b>client hardware</b> before any production episodes. Our pipelines output to <b>RLDS, HDF5, LeRobot V2, MCAP</b>, or whatever your stack needs.</>,
    },
    {
        num: '02',
        title: 'Nothing subcontracted, nothing outsourced',
        text: <>Every annotator, operator, and reviewer is on our payroll, working from our facility. <b>No gig workers. No crowdsourcing. No vendor chains.</b> Your data lives inside one controlled environment for the life of the project.</>,
    },
    {
        num: '03',
        title: 'Spun up in weeks, not quarters',
        text: <>Recruiting, training, equipment provisioning, ops, and QA all sit inside the same building. When scope expands or a new program lands, we <b>scale the team, not the vendor list</b>. Pilot to production on a robotics timeline.</>,
    },
    {
        num: '04',
        title: 'Capture to delivery, one team',
        text: <>Collection, teleoperation, annotation, labelling, format conversion, and final QA happen under one roof, one project manager, <b>one quality bar</b>. Raw capture goes in, training-ready data comes out.</>,
    },
]

export default function Positioning() {
    return (
        <section id="how">
            <AnimatedSection><div className="section-tag">How we differ</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Why robotics and Physical AI teams pick Human Loops over a generalist data vendor.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="pos-grid">
                    {CARDS.map((c, i) => (
                        <div className="card" key={i}>
                            <div className="pos-num">{c.num}</div>
                            <div className="pos-title">{c.title}</div>
                            <div className="pos-text">{c.text}</div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </section>
    )
}
