"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const INDUSTRIES = [
    {
        id: 'hc', label: '🏥 Healthcare', name: 'Healthcare',
        sector: 'Clinical · RCM · Prior Auth · Ambient AI',
        desc: 'Healthcare AI moves fast — errors cost lives and dollars. We embed licensed medical professionals directly into your workflows to verify, correct and label at the standard this industry demands.',
        services: ['Healthcare AI Output Verification', 'Prescription parsing & Rx QA', 'EHR / Clinical Data Migration', 'Prior auth exception handling', 'Denials management & appeals', 'Clinical review prep & utilization management support', 'Patient-facing content QA & compliance review'],
    },
    {
        id: 'fi', label: '💰 Finance', name: 'Finance',
        sector: 'Tax · AP · Compliance · Vendor Ops',
        desc: "Financial documents are high-stakes, high-volume and format-chaotic. We QA the outputs your AI can't afford to get wrong — with structured audit trails for every decision made.",
        services: ['Financial Document Extraction QA (K-1s, 1099s, W-2s)', 'Labelling & Manual entry of Invoices', 'Bank statement & income document AI extraction QA', 'Vendor tax form & master data QA', 'Financial Close & Reconciliation QA'],
    },
    {
        id: 'ins', label: '🛡️ Insurance', name: 'Insurance',
        sector: 'Claims · Underwriting · Fraud · Appeals',
        desc: 'Insurance workflows are built on documentation. We ensure every AI-assisted claim, policy and review is accurate, compliant and audit-ready before it moves downstream.',
        services: ['Claims document verification', 'Underwriting data QA', 'Fraud signal labelling', 'Appeals & grievance case ops', 'Compliance documentation QA', 'Policy issuance verification', 'Handling Edge Cases'],
    },
    {
        id: 'rob', label: '🤖 Robotics', name: 'Robotics & Autonomous Systems',
        sector: 'Labelling · Edge Cases · Ground Truth · Simulation QA',
        desc: "Autonomous systems are only as good as their training data. We annotate the edge cases your pipeline can't auto-label — at the precision and consistency model training demands.",
        services: ['LiDAR, camera & sensor labelling', 'Bounding box & polygon annotation', 'Robot Failure & Edge Case Review', 'Simulation & Synthetic Data QA', 'Scene classification & tagging', 'Human-robot interaction feedback', 'Teleoperation Data Review & Labelling'],
    },
]

const EXPANDING = ['🚛 Logistics', '⚖️ Legal Tech', '🛡️ Content Moderation', '🛒 E-Commerce', '🏗️ Real Estate', '+ Any AI workflow that needs a human']

export default function Industries() {
    const [active, setActive] = useState(0)

    return (
        <section id="ind" className="section-fade">
            <AnimatedSection><div className="section-tag">Industry Expertise</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Operational Depth.<br />Across Critical Industries.</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="section-sub">Specialist operations teams — deployed end to end across the industries where AI oversight matters most.</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="tabs">
                    {INDUSTRIES.map((ind, i) => (
                        <div key={ind.id} className={`tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>{ind.label}</div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatePresence mode="wait">
                <motion.div key={INDUSTRIES[active].id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
                    <div className="panel-name">{INDUSTRIES[active].name}</div>
                    <div className="panel-sector">{INDUSTRIES[active].sector}</div>
                    <p className="panel-desc">{INDUSTRIES[active].desc}</p>
                    <div className="services">
                        {INDUSTRIES[active].services.map((s, i) => (<span className="svc" key={i}>{s}</span>))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <AnimatedSection delay={0.1} className="ind-grow">
                <div className="igrow-label">Expanding Into</div>
                <div className="igrow-tags">
                    {EXPANDING.map((t, i) => (<span className="igtag" key={i}>{t}</span>))}
                </div>
            </AnimatedSection>
        </section>
    )
}
