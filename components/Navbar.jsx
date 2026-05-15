"use client"

import Image from 'next/image'
import ThemeToggle from './ThemeToggle'
import { CALENDLY_URL } from '@/lib/constants'

export default function Navbar() {
    return (
        <nav className="nav">
            <a href="#hero" className="nav-logo-link">
                <Image src="/logo.svg" alt="Human Loops" width={120} height={32} className="nav-logo-img" style={{ width: 'auto', height: 32 }} priority />
            </a>
            <ul className="nav-links">
                <li><a href="#how">How we differ</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#careers">Careers</a></li>
            </ul>
            <ThemeToggle />
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">Book a Call</a>
            <button className="nav-hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    )
}
