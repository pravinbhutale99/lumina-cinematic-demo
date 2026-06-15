'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeIn, cardReveal, staggerContainer } from '@/lib/motionVariants'
import { TREATMENTS, IMAGES } from '@/lib/constants'

function TxCard({ t, i }: { t: typeof TREATMENTS[0], i: number }) {
  return (
    <motion.div
      className="relative p-12 overflow-hidden group cursor-pointer"
      style={{ background: '#1e1a16' }}
      variants={cardReveal}
      custom={i % 3}
      whileHover={{ background: '#1a1510' }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg,rgba(184,154,106,0.08),transparent)' }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle,rgba(184,154,106,.18),transparent)', filter: 'blur(30px)', transition: 'opacity 0.5s, bottom 0.5s cubic-bezier(.16,1,.3,1)' }}
      />

      <span className="block text-[10px] text-gold tracking-[0.2em] mb-8">{t.num}</span>
      <span className="block text-2xl mb-5">{t.icon}</span>
      <h3 className="font-serif-display text-[26px] text-white mb-3.5">{t.title}</h3>
      <p className="text-[13px] text-white/38 leading-[1.75] mb-7">{t.desc}</p>
      <span className="inline-flex items-center gap-2 text-[12px] font-medium text-gold tracking-[0.06em] group-hover:gap-3.5 transition-all duration-300">
        Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </motion.div>
  )
}

export default function Treatments() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="treatments" className="py-36" style={{ background: 'linear-gradient(180deg,#0e0c0a 0%,#1e1a16 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-15 max-md:px-6">
        <div className="mb-18" ref={ref}>
          <motion.span
            className="label-text block mb-4"
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            What We Offer
          </motion.span>
          <motion.h2
            className="font-serif-display text-white"
            style={{ fontSize: 'clamp(36px,5vw,68px)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            Treatments crafted<br />for{' '}
            <em className="not-italic" style={{ color: '#d4b98a', fontStyle: 'italic' }}>lasting results</em>
          </motion.h2>
        </div>
      </div>

      {/* Grid — full bleed */}
      <motion.div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1,
          background: 'rgba(184,154,106,0.18)',
        }}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Featured */}
        <motion.div
          className="col-span-3 grid max-md:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(135deg,#1a1410,#0e0c0a)' }}
          variants={fadeIn}
        >
          {/* Image side */}
          <div className="relative overflow-hidden min-h-[360px]" style={{ background: 'linear-gradient(145deg,#2a2018,#1a1408)' }}>
            <span className="absolute inset-0 flex items-center justify-center font-serif-display text-[160px] text-white/[0.04] z-[1] pointer-events-none">✦</span>
            <Image
              src={IMAGES.featuredTx}
              alt="Smile design consultation"
              fill
              sizes="50vw"
              quality={80}
              className="object-cover opacity-0 transition-opacity duration-1000"
              onLoad={e => { (e.target as HTMLImageElement).style.opacity = '0.7' }}
            />
            <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to right,transparent,rgba(14,12,10,.85))' }} />
          </div>

          {/* Text side */}
          <div className="p-14 flex flex-col justify-center">
            <span className="text-[10px] text-gold tracking-[0.2em] mb-8 block">Signature Treatment</span>
            <h3 className="font-serif-display text-white text-[34px] mb-4">Complete Smile Design</h3>
            <p className="text-[14px] text-white/45 leading-relaxed mb-9">
              A full-arch transformation planned digitally — you see your result before a single tooth is touched. Proportion, colour, and alignment perfected. Most cases complete in two visits.
            </p>
            <div className="grid grid-cols-2 gap-5 mb-9">
              {[['2','Visits to completion'],['3D','Digital preview first'],['10y','Average longevity'],['14','Veneers, avg case']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif-display text-[32px] text-gold leading-none">{n}</div>
                  <div className="text-[10px] text-white/30 mt-1.5 tracking-[0.06em]">{l}</div>
                </div>
              ))}
            </div>
            <a href="#cta" className="inline-flex items-center gap-2 text-[12px] font-medium text-gold-lt tracking-[0.06em] hover:gap-3.5 transition-all duration-300 group">
              Explore process <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* Regular cards */}
        {TREATMENTS.map((t, i) => <TxCard key={t.num} t={t} i={i} />)}
      </motion.div>
    </section>
  )
}
