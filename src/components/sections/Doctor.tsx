'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { fadeRight, fadeIn, staggerContainer, fadeUp } from '@/lib/motionVariants'
import MagneticButton from '@/components/ui/MagneticButton'
import { CREDENTIALS, IMAGES } from '@/lib/constants'

export default function Doctor() {
  const ref      = useRef<HTMLElement>(null)
  const inView   = useInView(ref, { once: true, margin: '-12% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="doctor"
      ref={ref}
      className="py-36 overflow-hidden"
      style={{ background: '#1e1a16' }}
    >
      <div className="max-w-[1200px] mx-auto px-15 max-md:px-6">
        <div className="grid grid-cols-[500px_1fr] gap-20 items-center max-lg:grid-cols-1 max-lg:gap-14">

          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Offset gold border accent */}
            <div
              className="absolute z-0"
              style={{
                top: 20, right: -20, bottom: -20, left: 20,
                border: '1px solid rgba(184,154,106,0.2)',
                borderRadius: 2,
              }}
            />

            {/* Frame */}
            <div
              className="relative overflow-hidden z-[1]"
              style={{ borderRadius: 2, aspectRatio: '4/5', background: 'linear-gradient(145deg,#2a2418,#1a1810)' }}
            >
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src={IMAGES.doctor}
                  alt="Dr. Sofia Mehrotra"
                  fill
                  sizes="(max-width:1024px) 90vw, 500px"
                  quality={85}
                  className="object-cover object-top opacity-0 transition-opacity duration-1000 scale-[1.08]"
                  onLoad={e => { (e.target as HTMLImageElement).style.opacity = '0.85' }}
                />
              </motion.div>
              <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom,transparent 60%,rgba(14,12,10,0.5))' }} />

              {/* Dr initials fallback */}
              <div className="absolute inset-0 flex items-center justify-center font-serif-display text-[120px] text-white/[0.04] z-0">Dr</div>
            </div>

            {/* Badge */}
            <div
              className="absolute -bottom-7 -right-7 z-[10] rounded-2xl p-5 px-7"
              style={{ background: '#0e0c0a', border: '1px solid rgba(184,154,106,0.18)' }}
            >
              <div className="font-serif-display text-[40px] text-gold leading-none">12+</div>
              <div className="text-[10px] text-white/30 mt-1.5 tracking-[0.08em]">Years Experience</div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delayChildren: 0.2, staggerChildren: 0.12 }}
          >
            <motion.div className="flex items-center gap-3 mb-5" variants={fadeRight}>
              <span className="eyeline" />
              <span className="label-text">Your Doctor</span>
            </motion.div>

            <motion.h2
              className="font-serif-display text-white mb-2.5"
              style={{ fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1.1 }}
              variants={fadeRight}
            >
              Dr. Sofia<br />Mehrotra
            </motion.h2>

            <motion.p className="text-[13px] text-gold font-medium mb-7 tracking-[0.04em]" variants={fadeRight}>
              BDS · MSc Aesthetic Dentistry · Fellow, Royal College of Dentists
            </motion.p>

            <motion.p className="text-[16px] text-white/45 leading-[1.85] font-light mb-9" variants={fadeRight}>
              Trained in London and refined at leading aesthetic practices across North America, Dr. Mehrotra founded Lumina on a single belief: exceptional dentistry should feel as calm and considered as it looks.
            </motion.p>

            <motion.div className="flex flex-col gap-3 mb-11" variants={fadeIn}>
              {CREDENTIALS.map(c => (
                <div
                  key={c}
                  className="flex items-start gap-3.5 p-3.5 px-4.5 rounded-[10px] border transition-all duration-300 hover:border-gold/30 hover:bg-[rgba(184,154,106,0.05)]"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: '#b89a6a' }} />
                  <p className="text-[13px] text-white/50 leading-relaxed">{c}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <MagneticButton href="#cta" className="btn-dark">
                Book with Dr. Mehrotra <span>→</span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
