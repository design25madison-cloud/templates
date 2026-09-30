import { Glow } from './components/ui'
import { Hero, Navigation } from './sections/Hero'
import { About, Logos } from './sections/LogosAbout'
import { AiFeatures, Benefits, Tools } from './sections/Features'
import { HowItWorks, Testimonials } from './sections/HowTestimonials'

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      {/* Background glows, positioned as in the 2560px frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Glow className="top-[-118px] left-1/2 -translate-x-1/2" />
        <Glow className="top-[424px] left-1/2 -translate-x-1/2" />
        <Glow className="top-[2324px] -left-[54px] scale-[0.94]" />
      </div>

      {/* Dashed vertical rails framing the 1200px content column */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mx-auto hidden max-w-[1240px] md:block">
        <span className="absolute inset-y-0 left-5 border-l border-dashed border-ink/12" />
        <span className="absolute inset-y-0 right-5 border-l border-dashed border-ink/12" />
      </div>

      <Navigation />
      <main className="pb-24">
        <Hero />
        <Logos />
        <About />
        <Benefits />
        <AiFeatures />
        <Tools />
        <HowItWorks />
        <Testimonials />
      </main>
    </div>
  )
}
