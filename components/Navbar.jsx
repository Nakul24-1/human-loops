"use client"

import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="nav">
            <a href="#hero" className="nav-logo-link">
                <Image src="/logo.svg" alt="Human Loops" width={120} height={32} className="nav-logo-img" priority />
            </a>
            <ul className="nav-links">
                <li><a href="#pos">What We Do</a></li>
                <li><a href="#ind">Industries</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#vis">Vision</a></li>
                <li><a href="#jobs">Careers</a></li>
            </ul>
            <a href="https://calendly.com/shloak/introductory-call" target="_blank" rel="noopener noreferrer" className="nav-cta">Book a Call</a>
            <button className="nav-hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    )
}
