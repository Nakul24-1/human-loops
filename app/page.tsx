import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustTicker from '@/components/TrustTicker'
import Positioning from '@/components/Positioning'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Careers from '@/components/Careers'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustTicker />
      <Positioning />
      <Services />
      <Work />
      <Careers />
      <CTA />
      <Footer />
    </>
  )
}
