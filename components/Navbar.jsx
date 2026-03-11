"use client"

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="nav-logo">Human<span>Loops</span></div>
            <ul className="nav-links">
                <li><a href="#pos">What We Do</a></li>
                <li><a href="#ind">Industries</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#vis">Vision</a></li>
                <li><a href="#jobs">Careers</a></li>
            </ul>
            <a href="https://calendly.com/shloak/introductory-call" target="_blank" rel="noopener noreferrer" className="nav-cta">Book a Call</a>
        </nav>
    )
}
