"use client"

import AnimatedSection from './AnimatedSection'

const CASES = [
    {
        tag: 'Finance · US AI Tax Platform', title: 'High-Volume Tax Document QA',
        steps: [
            { num: '01', label: 'Challenge', text: 'AI and engineering teams extracted data from thousands of tax returns and tax organisers — inconsistent accuracy across software formats, density of categories and document types causing several errors and low-quality data.' },
            { num: '02', label: 'Deployment', text: '20-person dedicated team built from scratch. Every field reviewed, formats normalised, errors flagged and structured datasets delivered back to engineering.' },
            { num: '03', label: 'Outcome', text: 'Error rate dropped to near-zero. Engineering team fully freed from manual review. Full ops running inside 120 days.' },
        ],
        stats: [{ num: '75,000+', label: 'Documents processed' }, { num: '<120 days', label: 'Deployment to delivery' }, { num: '20', label: 'Team size' }],
    },
    {
        tag: 'Healthcare · AI SaaS Platform', title: 'Clinical AI Output Verification',
        steps: [
            { num: '01', label: 'Challenge', text: 'AI agents generating prior auth submissions and Rx parsing across thousands of patient records — drug names, dosage errors, several format errors that reached clinicians unverified.' },
            { num: '02', label: 'Deployment', text: '15-person team of trained professionals, nurses and licensed medical professionals — hired, trained and deployed on-ground to verify AI output against source documents in real time.' },
            { num: '03', label: 'Outcome', text: '23,000+ AI outputs verified. Corrections fed back as training data. Model accuracy improved. 24/7 ops coverage maintained continuously.' },
        ],
        stats: [{ num: '23,000+', label: 'AI outputs corrected' }, { num: '24/7', label: 'Ops coverage' }, { num: '15', label: 'Medical professionals' }],
    },
]

const TESTIMONIALS = [
    { quote: '"The team plugged into our pipeline in days. The quality bar they hold is genuinely impressive."', who: 'Head of Product', co: 'YC-backed AI startup' },
    { quote: '"We were struggling with scaling our QA/QC on data. The Human Loops team took that entirely off our plate."', who: 'CEO', co: 'AI HealthTech Platform' },
    { quote: '"Turnaround was super fast and error rates are the lowest at the price point we\'ve seen from any vendor, period."', who: 'CEO', co: 'AI Tax SaaS' },
]

export default function Work() {
    const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS]
    return (
        <section id="work" className="section-fade">
            <AnimatedSection><div className="section-tag">Client Work</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Results That Speak.</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="section-sub">A selection of how we&apos;ve operated. Clients are confidential — the outcomes are real.</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="work-grid">
                    {CASES.map((c, ci) => (
                        <div className="card" key={ci}>
                            <div className="work-tag">{c.tag}</div>
                            <div className="work-title">{c.title}</div>
                            <div className="work-steps">
                                {c.steps.map((s, si) => (
                                    <div className="work-step" key={si}>
                                        <div className="work-step-num">{s.num}</div>
                                        <div className="work-step-text"><strong>{s.label}</strong>{s.text}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="work-stats">
                                {c.stats.map((s, si) => (<div key={si}><div className="work-stat-num">{s.num}</div><div className="work-stat-label">{s.label}</div></div>))}
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
            <div className="test-wrap">
                <div className="test-track">
                    {allTestimonials.map((t, i) => (
                        <div className="test-card" key={i}>
                            <div className="test-quote">{t.quote}</div>
                            <div className="test-who"><strong>{t.who}</strong><span>{t.co}</span></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
