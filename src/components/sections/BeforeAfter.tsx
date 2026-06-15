'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeIn, cardReveal } from '@/lib/motionVariants'
import { BA_CASES, IMAGES } from '@/lib/constants'

export default function BeforeAfter() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="ba" className="py-36 bg-ink">
      <div className="max-w-[1200px] mx-auto px-15 max-md:px-6">

        {/* Header */}
        <div className="text-center mb-20" ref={ref}>
          <motion.span className="label-text block mb-4" variants={fadeIn} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Real Results
          </motion.span>
          <motion.h2
            className="font-serif-display text-white"
            style={{ fontSize: 'clamp(36px,5vw,66px)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            Before &amp; <em style={{ color: '#d4b98a', fontStyle: 'italic' }}>after</em>
          </motion.h2>
          <motion.p
            className="text-[15px] text-white/38 leading-relaxed max-w-[460px] mx-auto mt-4"
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            Each transformation is a real Lumina patient — different starting point, same level of craft.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {BA_CASES.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl overflow-hidden border border-white/7 hover:border-gold/30 transition-colors duration-400 group"
              variants={cardReveal}
              custom={i}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16,1,0.3,1] } }}
            >
              {/* Split visual */}
              <div className="relative h-64 flex overflow-hidden">
                {/* Before */}
                <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#2a2218,#1e1a12)' }}>
                  <Image
                    src={IMAGES.ba[i].before}
                    alt={`Before — ${c.title}`}
                    fill
                    sizes="20vw"
                    quality={70}
                    className="object-cover object-top opacity-0 transition-opacity duration-700 group-hover:scale-[1.03] transition-transform duration-700"
                    onLoad={e => { (e.target as HTMLImageElement).style.opacity = '0.72' }}
                  />
                  <span className="absolute bottom-3 left-3 z-10 text-[8px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/65 border border-white/10">Before</span>
                </div>

                {/* Divider */}
                <div className="ba-divider" />

                {/* After */}
                <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#1a1e20,#141c20)' }}>
                  <Image
                    src={IMAGES.ba[i].after}
                    alt={`After — ${c.title}`}
                    fill
                    sizes="20vw"
                    quality={70}
                    className="object-cover object-top opacity-0 transition-opacity duration-700 group-hover:scale-[1.03] transition-transform duration-700"
                    onLoad={e => { (e.target as HTMLImageElement).style.opacity = '0.72' }}
                  />
                  <span className="absolute bottom-3 right-3 z-10 text-[8px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/65 border border-white/10">After</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 px-7" style={{ background: 'linear-gradient(180deg,#1e1a16,#141210)' }}>
                <h4 className="font-serif-display text-[22px] text-white mb-1.5">{c.title}</h4>
                <p className="text-[13px] text-white/38 leading-relaxed">{c.desc}</p>
                <span
                  className="inline-flex items-center gap-1.5 mt-3.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.08em]"
                  style={{ background: 'rgba(184,154,106,0.1)', border: '1px solid rgba(184,154,106,0.2)', color: '#b89a6a' }}
                >
                  {c.chip}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
