"use client"

import AnimatedSection from './AnimatedSection'

const FORMAT_CHIPS = ['RLDS', 'HDF5', 'LeRobot V2', 'MCAP', 'zarr']
const FLOW_STEPS = ['Capture', 'Teleop', 'Annotate', 'QA', 'Delivery']

export default function Positioning() {
    return (
        <section id="how">
            <AnimatedSection><div className="section-tag">How we differ</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Why robotics and Physical AI teams pick Human Loops over a generalist data vendor.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="pos-bento">
                    {/* Card 01 — featured: title, body, output formats, flow track */}
                    <div className="card pos-card-1">
                        <div>
                            <div className="pos-title">Specialists, not generalists</div>
                            <div className="pos-text">
                                Egocentric capture, teleoperation, and multimodal annotation are not side offerings. They are what we go deep on. Our operators train on <b>client hardware</b> before any production episodes. Our pipelines output to whatever your stack needs.
                            </div>
                        </div>

                        <div className="pos-chips">
                            <div className="pos-chips-label">Output formats</div>
                            <div className="pos-chips-row">
                                {FORMAT_CHIPS.map((c) => (<span className="pos-chip" key={c}>{c}</span>))}
                            </div>
                        </div>

                        <div className="pos-track" aria-hidden="true">
                            {FLOW_STEPS.map((step, i) => (
                                <span className="pos-track-step" key={step}>
                                    <span className="pos-track-dot" />
                                    <span className="pos-track-label">{step}</span>
                                    {i < FLOW_STEPS.length - 1 && <span className="pos-track-line" />}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Card 02 — wide: body left + stat callout right */}
                    <div className="card pos-card-2">
                        <div className="pos-card-2-body">
                            <div className="pos-title">Nothing subcontracted, nothing outsourced</div>
                            <div className="pos-text">
                                Every annotator, operator, and reviewer is on our payroll, working from our facility. <b>No gig workers. No crowdsourcing. No vendor chains.</b> Your data lives inside one controlled environment for the life of the project.
                            </div>
                        </div>
                        <div className="pos-callout">
                            <div className="pos-callout-num">65+</div>
                            <div className="pos-callout-label">On payroll</div>
                            <div className="pos-callout-divider" />
                            <div className="pos-callout-num">0</div>
                            <div className="pos-callout-label">Contractors</div>
                        </div>
                    </div>

                    {/* Card 03 — compact */}
                    <div className="card pos-card-3">
                        <div className="pos-title">Spun up in weeks, not quarters</div>
                        <div className="pos-text">
                            Recruiting, training, equipment, ops, and QA all sit inside the same building. When scope expands, we <b>scale the team, not the vendor list</b>.
                        </div>
                    </div>

                    {/* Card 04 — compact with top accent chips */}
                    <div className="card pos-card-4">
                        <div className="pos-mini-chips">
                            <span>One PM</span>
                            <span>One quality bar</span>
                            <span>One roof</span>
                        </div>
                        <div className="pos-title">Capture to delivery, one team</div>
                        <div className="pos-text">
                            Collection, teleoperation, annotation, labelling, format conversion, and final QA happen under one roof.
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}
