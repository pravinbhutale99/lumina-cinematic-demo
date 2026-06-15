import GrainOverlay from '@/components/ui/GrainOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Loader from '@/components/ui/Loader'
import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import Treatments from '@/components/sections/Treatments'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Testimonials from '@/components/sections/Testimonials'
import Doctor from '@/components/sections/Doctor'
import Gallery from '@/components/sections/Gallery'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Loader />
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <MarqueeStrip />
          <Treatments />
          <BeforeAfter />
          <Testimonials />
          <Doctor />
          <Gallery />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
