import Image from 'next/image'

export default function Footer() {
    return (
        <>
            <div className="back-to-top">
                <a href="#hero">↑ &nbsp; Back to Top</a>
            </div>
            <footer className="footer">
                <a href="#hero" className="footer-logo-link">
                    <Image src="/logo.svg" alt="Human Loops" width={100} height={26} className="footer-logo-img" />
                </a>
                <nav className="footer-nav">
                    <a href="#pos">What We Do</a>
                    <a href="#ind">Industries</a>
                    <a href="#work">Work</a>
                    <a href="#vis">Vision</a>
                    <a href="#jobs">Careers</a>
                </nav>
                <div className="footer-social">
                    <a href="https://www.linkedin.com/company/human-loops/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    <a href="https://x.com/Human_Loops" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="X (Twitter)">
                        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                </div>
                <div className="footer-copy">© 2026 Human Loops — A brand of Pacheriwala Pvt Ltd · thehumanloops.com</div>
            </footer>
        </>
    )
}
