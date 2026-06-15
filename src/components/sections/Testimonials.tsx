'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeIn } from '@/lib/motionVariants'
import { TESTIMONIALS, IMAGES } from '@/lib/constants'

const AV_BG = [
  'linear-gradient(135deg,#6b5a3e,#9c7d55)',
  'linear-gradient(135deg,#3a5a6b,#557d9c)',
  'linear-gradient(135deg,#3a6b4a,#559c65)',
  'linear-gradient(135deg,#6b3a3a,#9c5555)',
  'linear-gradient(135deg,#3a3a6b,#55559c)',
]

const all = [...TESTIMONIALS, ...TESTIMONIALS]

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="testimonials"
      className="py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#1e1a16 0%,#0e0c0a 100%)' }}
    >
      <div className="max-w-[1200px] mx-auto px-15 mb-18 max-md:px-6" ref={ref}>
        <motion.span className="label-text block mb-4" variants={fadeIn} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Patient Stories
        </motion.span>
        <motion.h2
          className="font-serif-display text-white"
          style={{ fontSize: 'clamp(36px,5vw,66px)' }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.1 }}
        >
          Words from<br />our patients
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-1.5">
        <motion.div
          className="test-track"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {all.map((t, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[360px] rounded-2xl p-8 px-9 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(184,154,106,0.25)',
                background: 'rgba(255,255,255,0.05)',
                transition: { duration: 0.35, ease: [0.16,1,0.3,1] },
              }}
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(184,154,106,0.05),transparent)' }} />

              <div className="text-gold text-[11px] tracking-[3px] mb-4">★★★★★</div>
              <blockquote className="font-serif-display text-[19px] text-white leading-[1.55] italic mb-6">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-[38px] h-[38px] rounded-full flex-shrink-0 relative overflow-hidden"
                  style={{ background: AV_BG[t.av] }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-serif-display text-[17px] text-white z-[1]">
                    {t.name[0]}
                  </span>
                  <Image
                    src={IMAGES.avatars[t.av]}
                    alt={t.name}
                    fill
                    sizes="38px"
                    quality={60}
                    className="object-cover object-top opacity-0 transition-opacity duration-500 z-[2] absolute"
                    onLoad={e => { (e.target as HTMLImageElement).style.opacity = '1' }}
                  />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white">{t.name}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
