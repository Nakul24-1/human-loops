"use client"

import AnimatedSection from './AnimatedSection'

const JOBS = [
    { title: 'Operations Manager', tags: ['Ops Leadership', 'Nagpur', 'Full-time'] },
    { title: 'Operations Associate', tags: ['HITL Ops', 'Nagpur', 'Full-time'] },
    { title: 'Nurse — Clinical QA', tags: ['Healthcare Ops', 'Nagpur', 'Full-time'] },
    { title: 'Data Labelling Specialist', tags: ['Robotics Ops', 'Nagpur', 'Full-time'] },
    { title: 'Business Development', tags: ['Growth', 'Remote', 'Full-time'] },
]

export default function Careers() {
    return (
        <section id="jobs">
            <AnimatedSection><div className="section-tag">Careers</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Join the Loop.</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="section-sub">Detail-obsessed operators who want to work at the frontier of AI and human collaboration.</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="jobs-grid">
                    {JOBS.map((j, i) => (
                        <div className="job-card" key={i}>
                            <div className="job-title">{j.title}</div>
                            <div className="job-meta">
                                {j.tags.map((t, ti) => (<span className="job-meta-tag" key={ti}>{t}</span>))}
                            </div>
                            <a href="https://www.linkedin.com/company/human-loops/" target="_blank" rel="noopener noreferrer" className="job-apply">Apply on LinkedIn →</a>
                        </div>
                    ))}
                    <div className="job-card" style={{ borderStyle: 'dashed', opacity: 0.5 }}>
                        <div className="job-title" style={{ color: 'var(--g)' }}>More roles opening soon</div>
                        <div className="job-meta"><span className="job-meta-tag">Multiple teams</span><span className="job-meta-tag">Nagpur</span></div>
                        <a href="mailto:hello@thehumanloops.com" className="job-apply">Send your profile →</a>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}
