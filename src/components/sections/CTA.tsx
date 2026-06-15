'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motionVariants'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CTA() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="cta" className="relative py-32 overflow-hidden bg-ink" ref={ref}>

      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 15% 50%,rgba(184,154,106,.14) 0%,transparent 50%),
            radial-gradient(ellipse at 85% 50%,rgba(184,154,106,.10) 0%,transparent 50%),
            radial-gradient(ellipse at 50% 0%,rgba(184,154,106,.08) 0%,transparent 40%)
          `
        }}
      />

      {/* Grid lines with radial fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.055,
          backgroundImage: `
            linear-gradient(rgba(184,154,106,1) 1px,transparent 1px),
            linear-gradient(90deg,rgba(184,154,106,1) 1px,transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 50% 50%,black 20%,transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%,black 20%,transparent 70%)',
        }}
      />

      <div className="relative z-[1] max-w-[1200px] mx-auto px-15 max-md:px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.span className="label-text block mb-5" variants={fadeIn}>
            Begin Your Journey
          </motion.span>

          <motion.h2
            className="font-serif-display text-white mb-4"
            style={{ fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1.06 }}
            variants={fadeUp}
          >
            Your best smile<br />
            is one visit{' '}
            <em style={{ fontStyle: 'italic', color: '#b89a6a' }}>away</em>
          </motion.h2>

          <motion.p className="text-[15px] text-white/35 mb-14 font-light" variants={fadeIn}>
            Free consultation · Same-week appointments · All insurances welcomed
          </motion.p>

          <motion.div className="flex justify-center gap-3.5 flex-wrap" variants={fadeIn}>
            <MagneticButton href="tel:4165550192" className="btn-gold" style={{ height: 54, fontSize: 13, padding: '0 36px' }}>
              📞 Call (416) 555-0192
            </MagneticButton>
            <MagneticButton href="mailto:hello@luminadental.ca" className="btn-ghost" style={{ height: 54 }}>
              Send a Message <span>→</span>
            </MagneticButton>
          </motion.div>

          <motion.p className="text-[11px] text-white/20 mt-6 tracking-[0.05em]" variants={fadeIn}>
            245 Yonge Street, Suite 800, Toronto ON · Mon–Fri 8am–7pm · Sat 9am–4pm
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
