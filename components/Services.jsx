"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const PRACTICES = [
    {
        id: 'pai',
        label: 'Physical AI',
        desc: 'Capture the physical world. Teleoperate inside it. Annotate it.',
        services: [
            {
                num: '01',
                title: 'Egocentric Data Collection',
                tagline: 'First-person video from wearable rigs, iPhones, and head-mounted GoPros, captured across real environments at scale.',
                included: [
                    'Household, commercial, industrial, retail, and outdoor environments',
                    'Multi-camera RGB, RGB-D, and stereo capture',
                    'Hand keypoints, gaze tracking, action labels, contact points',
                    'Volume from pilot (hundreds of hours) to program scale (100,000+ hours)',
                ],
            },
            {
                num: '02',
                title: 'Teleoperation Data Collection',
                tagline: 'We teleoperate robots — for training, for data collection, for running production tasks, or for evaluating policies in the loop. Skilled operators trained on your platform.',
                included: [
                    'Operators trained on the specific platform before any production episodes',
                    'Leader-follower (including GELLO), VR (Meta Quest), and SpaceMouse interfaces',
                    'Synchronized multimodal capture across vision, depth, proprioception, and force',
                    'Per-episode quality review for smoothness, success, and temporal sync under 10ms drift',
                    'Output formats: RLDS, HDF5, zarr, LeRobot V2',
                ],
            },
            {
                num: '03',
                title: 'Real World Capture for Sim and World Models',
                tagline: 'Specialized multimodal capture in target environments — warehouses, factories, retail floors, labs.',
                included: [
                    'Client-provided or sourced specialty hardware (depth rigs, LiDAR, MoCap)',
                    'Synchronized multimodal capture (vision, depth, IMU, action telemetry)',
                    'Scene metadata, episode boundaries, calibration documentation',
                ],
            },
            {
                num: '04',
                title: 'Multimodal Annotation',
                tagline: 'Time-synchronized labelling across vision, depth, and force.',
                included: [
                    'Semantic segmentation, bounding boxes, 3D bounding boxes, keypoint detection',
                    'Hand-object contact, affordance labels, instruction generation',
                    'Cross-modal time synchronization validated per episode',
                ],
            },
            {
                num: '05',
                title: 'Video Annotation and Labelling',
                tagline: 'Action recognition, temporal segmentation, and object tracking across long-horizon video for foundation-model training and evaluation.',
                included: [
                    'Temporal action segmentation and labelling',
                    'Object tracking and re-identification across frames',
                    'Hand-object interaction labelling for manipulation tasks',
                    'Hindsight labelling — natural-language task descriptions for raw episodes',
                    'Edge-case curation: deformables, transparents, contact-rich, occluded scenes',
                ],
            },
        ],
    },
    {
        id: 'fin',
        label: 'Finance',
        desc: 'High-stakes document workflows where we already operate at scale.',
        services: [
            {
                num: '01',
                title: 'Synthetic Data Creation',
                tagline: 'Production-grade synthetic financial datasets for model pretraining and benchmarking.',
                included: [
                    'Synthetic US tax returns across forms 1040, 1120, 1065, and schedules',
                    'CPA-verified accuracy on synthetic outputs',
                    'Format-correct, statistically realistic, edge-case inclusive',
                    'Custom schemas matched to your model inputs',
                ],
            },
            {
                num: '02',
                title: 'Tax Document Annotation and Labelling',
                tagline: 'Field-level extraction and structured labelling at production volume.',
                included: [
                    'Form-aware labelling across Lacerte, ProSeries, UltraTax, Drake',
                    'Field normalization and error flagging',
                    '75,000+ documents per engagement',
                    'Structured datasets delivered direct to your engineering pipeline',
                ],
            },
            {
                num: '03',
                title: 'AI Output Validation — Financial Documents',
                tagline: 'Verification of AI-extracted outputs against source documents.',
                included: [
                    'Account-level reconciliation review',
                    'Extraction QA against source PDFs and structured inputs',
                    'Real-time correction feedback to model training',
                    'Compliance-aware reviewers',
                ],
            },
            {
                num: '04',
                title: 'Insurance Claims Processing',
                tagline: 'Human verification and structured labelling of claims and supporting documents.',
                included: [
                    'Claims intake, field extraction, completeness review',
                    'Coverage validation and exception flagging',
                    'Supporting document classification and tagging',
                    'Cross-document consistency checks',
                ],
            },
        ],
    },
]

export default function Services() {
    const [active, setActive] = useState(0)
    const practice = PRACTICES[active]

    return (
        <section id="services" className="section-fade">
            <AnimatedSection><div className="section-tag">What we do</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Services.</h2></AnimatedSection>
            <AnimatedSection delay={0.15}><p className="section-sub">Two practices. Both run end to end, in our facility, by our team.</p></AnimatedSection>

            <AnimatedSection delay={0.2}>
                <div className="svc-tabs">
                    {PRACTICES.map((p, i) => (
                        <button
                            type="button"
                            key={p.id}
                            className={`svc-tab${active === i ? ' active' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatePresence mode="wait">
                <motion.div
                    key={practice.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="practice-name">{practice.label}</div>
                    <p className="practice-desc">{practice.desc}</p>

                    <div className="svc-grid">
                        {practice.services.map((s) => (
                            <div className="svc-card" key={s.num}>
                                <div className="svc-card-num">{s.num}</div>
                                <div className="svc-card-title">{s.title}</div>
                                <div className="svc-card-tagline">{s.tagline}</div>
                                <div className="svc-card-included">What&apos;s included</div>
                                <ul className="svc-card-list">
                                    {s.included.map((item, i) => (<li key={i}>{item}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    )
}
