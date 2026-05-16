"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const PRACTICES = [
    {
        id: 'pai',
        label: 'Physical AI',
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
                tagline: 'We teleoperate robots. For training, data collection, supervised autonomy, and running production tasks. Operators are based in our Nagpur facility and can connect to your robots anywhere in the world over your existing teleop stack.',
                included: [
                    'Operators trained on the specific platform before any production episodes',
                    'Remote operation over your teleop stack',
                    'Synchronized multimodal capture across vision, depth, proprioception, and force where available',
                    'Output formats when data is the deliverable: RLDS, HDF5, zarr, LeRobot V2',
                    '24/7 shift coverage available across US, EU, and APAC time zones',
                ],
            },
            {
                num: '03',
                title: 'Real World Capture for Sim & World Models',
                tagline: 'Specialized multimodal capture in target environments: warehouses, factories, retail floors, labs.',
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
                title: 'Video Annotation & Labelling',
                tagline: 'Action recognition, temporal segmentation, and object tracking across long-horizon video for foundation-model training and evaluation.',
                included: [
                    'Temporal action segmentation and labelling',
                    'Object tracking and re-identification across frames',
                    'Hand-object interaction labelling for manipulation tasks',
                    'Hindsight labelling: natural-language task descriptions for raw episodes',
                    'Edge-case curation: deformables, transparents, contact-rich, occluded scenes',
                ],
            },
        ],
    },
    {
        id: 'fin',
        label: 'Finance',
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
                title: 'Tax Document Annotation & Labelling',
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
                title: 'AI Output Validation for Financial Documents',
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

function PlusIcon() {
    return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 1v12M1 7h12" />
        </svg>
    )
}

export default function Services() {
    const [practiceIdx, setPracticeIdx] = useState(0)
    const [activeIdx, setActiveIdx] = useState(0)
    const practice = PRACTICES[practiceIdx]
    const active = practice.services[activeIdx]

    const switchPractice = (i) => {
        setPracticeIdx(i)
        setActiveIdx(0)
    }

    return (
        <section id="services" className="section-fade">
            <AnimatedSection><div className="section-tag">Services</div></AnimatedSection>
            <AnimatedSection delay={0.1}><h2>Two practices. Both run end to end, in our facility, by our team.</h2></AnimatedSection>

            <AnimatedSection delay={0.2}>
                <div className="svc-tabs">
                    {PRACTICES.map((p, i) => (
                        <button
                            type="button"
                            key={p.id}
                            className={`svc-tab${practiceIdx === i ? ' active' : ''}`}
                            onClick={() => switchPractice(i)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
                <div className="svc-accordion">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${practice.id}-${active.num}`}
                            className="svc-detail"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="svc-detail-num">{active.num} · {practice.label}</div>
                            <div className="svc-detail-title">{active.title}</div>
                            <div className="svc-detail-tagline">{active.tagline}</div>
                            <div className="svc-detail-included">What&apos;s included</div>
                            <ul className="svc-detail-list">
                                {active.included.map((item, i) => (<li key={i}>{item}</li>))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>

                    <div className="svc-list">
                        {practice.services.map((s, i) => (
                            <button
                                type="button"
                                key={s.num}
                                className={`svc-row${activeIdx === i ? ' active' : ''}`}
                                onClick={() => setActiveIdx(i)}
                            >
                                <span className="svc-row-left">
                                    <span className="svc-row-num">{s.num}</span>
                                    <span className="svc-row-title">{s.title}</span>
                                </span>
                                <span className="svc-row-arrow" aria-hidden="true">
                                    <PlusIcon />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}
