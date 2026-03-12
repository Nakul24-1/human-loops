import MeshGradientBG from '@/components/MeshGradientBG'
import LightStreams from '@/components/LightStreams'
import GlowOrb from '@/components/GlowOrb'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
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
