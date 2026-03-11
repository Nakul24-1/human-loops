import MeshGradientBG from '@/components/MeshGradientBG'
import LightStreams from '@/components/LightStreams'
import GlowOrb from '@/components/GlowOrb'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { LoopAnimation } from '@/components/loop-animation'
import AnimatedSection from '@/components/AnimatedSection'
import TrustTicker from '@/components/TrustTicker'
import Positioning from '@/components/Positioning'
import Industries from '@/components/Industries'
import Work from '@/components/Work'
import Vision from '@/components/Vision'
import Team from '@/components/Team'
import Careers from '@/components/Careers'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <MeshGradientBG />
      <LightStreams />
      <GlowOrb />

      {/* Content */}
      <Navbar />
      <Hero />

      {/* Pipeline Animation — fixed height to prevent layout shifts */}
      <AnimatedSection className="loop-hero-section" delay={0.3}>
        <div className="loop-hero-label">How the Loop Works</div>
        <div className="loop-fixed-container">
          <LoopAnimation />
        </div>
      </AnimatedSection>

      <TrustTicker />
      <Positioning />
      <Industries />
      <Work />
      <Vision />
      <Team />
      <Careers />
      <CTA />
      <Footer />
    </>
  )
}
