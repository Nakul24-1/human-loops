"use client"

import AnimatedSection from './AnimatedSection'

export default function Vision() {
    return (
        <section id="vis" className="section-fade">
            <AnimatedSection><div className="section-tag">Vision</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>A New World Is Already Here.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="vision-wrap">
                    <p>Traditional BPOs will <strong>die or adapt.</strong> The companies that define the next decade won&apos;t outsource the past — they&apos;ll build the future. Our vision is to become the <strong>leading new-age BPO for the AI world</strong> — first movers partnering with AI companies before the playbook exists, constructing new systems, inventing new job roles, and building entirely new operational ecosystems from scratch. The problems we&apos;ll solve in five years <strong>don&apos;t have names yet.</strong> That doesn&apos;t concern us. It drives us.</p>
                </div>
            </AnimatedSection>
        </section>
    )
}
