"use client"

import AnimatedSection from './AnimatedSection'

const CASES = [
    {
        num: '01',
        tag: 'Physical AI · Egocentric Data Program',
        title: '50,000 hours across 120 commercial environments and 300+ households.',
        hook: 'Two months. Strict per-contributor quotas. iPhone-only capture via the client app.',
        steps: [
            { num: '01', label: 'Challenge', text: 'High-diversity first-person video for model pretraining. Strict per-contributor quotas, iPhone-only capture via the client mobile app, two-month window.' },
            { num: '02', label: 'Deployment', text: 'Sourced 120 commercial environments across retail, industrial, agriculture, and automotive. Onboarded 300+ households. 125 hours per commercial contributor, 50 per household, set to hit diversity targets. 40 field supervisors managed contributors in person to maintain 95% data quality accuracy.' },
            { num: '03', label: 'Outcome', text: '50,000 hours delivered inside the window. Diversity targets met across environment, demographic, and task.' },
        ],
        stats: [
            { num: '50,000', label: 'Hours delivered' },
            { num: '120', label: 'Commercial environments' },
            { num: '300+', label: 'Households' },
        ],
        actions: [
            { label: 'See sample egocentric videos →', primary: true, href: 'https://drive.google.com/drive/folders/1uyFZ0tCjoYm4kY6kS92d7d5vfF3mGDeT?usp=sharing' },
        ],
    },
    {
        num: '02',
        tag: 'Physical AI · Real-to-Sim Capture Program',
        title: '5,000 hours of specialized warehouse capture for a real-to-sim pipeline.',
        hook: 'Dense multimodal capture inside live warehouse environments for world-model training and policy evaluation.',
        steps: [
            { num: '01', label: 'Challenge', text: 'A robotics customer building autonomous warehouse systems needed dense, multimodal capture inside live warehouse environments: synchronized RGB-D, depth, motion, and operator action data for downstream simulation, world-model training, and policy evaluation.' },
            { num: '02', label: 'Deployment', text: 'Deployed a specialized field team trained on client-provided capture hardware. Multi-rig synchronized recording (RGB-D, depth, IMU, action telemetry) operated across one warehouse site. On-site quality reviewers validated every session for synchronization, completeness, and protocol compliance. Custom format conversion and metadata schemas matched the client simulation stack directly.' },
            { num: '03', label: 'Outcome', text: '5,000 hours of production-ready capture, fully synchronized, structured to the client sim format, delivered as a continuously growing dataset feeding their world-model training and real-to-sim evaluation loops in 45 days.' },
        ],
        stats: [
            { num: '5,000', label: 'Hours captured' },
            { num: '45 days', label: 'To first delivery' },
            { num: '1', label: 'Live warehouse site' },
        ],
    },
    {
        num: '03',
        tag: 'Finance · AI Tax Platform',
        title: 'High-volume tax document QA across 75,000+ documents.',
        hook: 'A 20-person dedicated on-site team running 24/7 across Lacerte, ProSeries, UltraTax, and Drake.',
        steps: [
            { num: '01', label: 'Challenge', text: "An AI tax platform's extraction pipeline produced inconsistent accuracy across software formats, document categories, and form densities. Errors were reaching engineering review faster than they could be corrected." },
            { num: '02', label: 'Deployment', text: '20-person dedicated on-site team operating 24/7. Every field reviewed, formats normalized across Lacerte, ProSeries, UltraTax, Drake, errors flagged, and structured datasets delivered back to the engineering team.' },
            { num: '03', label: 'Outcome', text: 'Full operations and onboarding handled by Human Loops. Engineering team fully freed from manual review. Error rate dropped to near zero across the deployment window.' },
        ],
        stats: [
            { num: '75,000+', label: 'Documents processed' },
            { num: '24/7', label: 'Ops coverage' },
            { num: '20', label: 'Team size' },
        ],
    },
    {
        num: '04',
        tag: 'Finance · Synthetic Tax Document Dataset',
        title: '400 masked 1040s plus full supporting document sets. Nine weeks.',
        hook: 'Production-grade synthetic US tax returns for model training — every supporting document a real filing would include.',
        steps: [
            { num: '01', label: 'Challenge', text: 'An AI tax platform needed a production-grade synthetic dataset of US tax returns for model training. Real returns, fully de-identified, with every supporting document a real filing would include.' },
            { num: '02', label: 'Deployment', text: 'Started from 400 real 1040s. PII removed across every form and supporting document to produce 400 masked 1040s. For each return, the team generated the full supporting set: W-2s, 1099 INT, 1099 DIV, and all other source documents, plus tax summaries and tax questionnaires. Mixed team of associates and CPAs, with CPA review on every return for format correctness and tax-logic consistency.' },
            { num: '03', label: 'Outcome', text: "Complete synthetic dataset delivered in nine weeks. Format-correct, statistically faithful, CPA-verified, ready as direct input to the client's training pipeline." },
        ],
        stats: [
            { num: '400', label: 'Masked 1040s + supporting docs' },
            { num: '9 weeks', label: 'End to end' },
            { num: '100%', label: 'CPA-reviewed' },
        ],
    },
]

export default function Work() {
    return (
        <section id="work" className="section-fade">
            <AnimatedSection><div className="section-tag">Selected work</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>A selection of how we operate. Clients stay confidential. The outcomes are real.</h2></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="work-grid">
                    {CASES.map((c) => (
                        <div className="card" key={c.num}>
                            <div className="work-tag">Case {c.num} · {c.tag}</div>
                            <div className="work-title">{c.title}</div>
                            <div className="work-hook">{c.hook}</div>
                            <div className="work-steps">
                                {c.steps.map((s, si) => (
                                    <div className="work-step" key={si}>
                                        <div className="work-step-num">{s.num}</div>
                                        <div className="work-step-text"><strong>{s.label}</strong>{s.text}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="work-stats">
                                {c.stats.map((s, si) => (
                                    <div key={si}>
                                        <div className="work-stat-num">{s.num}</div>
                                        <div className="work-stat-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            {c.actions && (
                                <div className="work-actions">
                                    {c.actions.map((a, ai) => (
                                        <a key={ai} href={a.href} target="_blank" rel="noopener noreferrer" className={a.primary ? 'btn-primary' : 'btn-secondary'}>{a.label}</a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </section>
    )
}
