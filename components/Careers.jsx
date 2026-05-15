"use client"

import AnimatedSection from './AnimatedSection'
import { LINKEDIN_URL, CONTACT_EMAIL } from '@/lib/constants'

const JOBS = [
    { title: 'Field Operations Manager', tags: ['Physical AI Ops', 'Nagpur', 'Full-time'] },
    { title: 'Operations Manager', tags: ['Ops Leadership', 'Nagpur', 'Full-time'] },
    { title: 'Operations Associate', tags: ['HITL Ops', 'Nagpur', 'Full-time'] },
    { title: 'Annotator', tags: ['Data Ops', 'Nagpur', 'Full-time'] },
    { title: 'Recruiter', tags: ['People Ops', 'Nagpur', 'Full-time'] },
    { title: 'Operations Intern', tags: ['Multiple teams', 'Nagpur', 'Full-time'] },
]

export default function Careers() {
    return (
        <section id="careers">
            <AnimatedSection><div className="section-tag">Careers</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Join our team.</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="section-sub">Detail-obsessed operators who want to work at the frontier of AI and the physical world. All roles are full time, on site, in Nagpur.</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="jobs-grid">
                    {JOBS.map((j, i) => (
                        <div className="job-card" key={i}>
                            <div className="job-title">{j.title}</div>
                            <div className="job-meta">
                                {j.tags.map((t, ti) => (<span className="job-meta-tag" key={ti}>{t}</span>))}
                            </div>
                            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="job-apply">Apply on LinkedIn →</a>
                        </div>
                    ))}
                    <div className="job-card" style={{ borderStyle: 'dashed' }}>
                        <div className="job-title">Don&apos;t see your role?</div>
                        <div className="job-meta"><span className="job-meta-tag">Anywhere</span><span className="job-meta-tag">Send your profile</span></div>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="job-apply">{CONTACT_EMAIL} →</a>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}
