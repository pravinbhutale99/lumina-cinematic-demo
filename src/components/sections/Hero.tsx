'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, wordReveal, fadeIn, glassCardReveal } from '@/lib/motionVariants'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MagneticButton from '@/components/ui/MagneticButton'
import LuminaBot from '@/components/ui/LuminaBot'
import { IMAGES } from '@/lib/constants'

const WORDS = ['Confidence', 'begins', 'with', 'your smile.']

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const botY   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[100svh] min-h-[640px] overflow-hidden flex items-end bg-ink"
    >

      {/* ── BG image with parallax ── */}
      <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: bgY }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 65% 35%,rgba(184,154,106,.13) 0%,transparent 45%), linear-gradient(160deg,#1a1410 0%,#0a0806 100%)' }}
        />
        <Image
          src={IMAGES.heroBg}
          alt="Lumina Dental clinic interior"
          fill priority quality={85} sizes="100vw"
          className="object-cover object-center opacity-0 transition-opacity duration-[1500ms]"
          onLoad={e => { (e.target as HTMLImageElement).style.opacity = '0.5' }}
        />
      </motion.div>

      {/* Vignette overlays */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to top,rgba(10,8,6,.96) 0%,rgba(10,8,6,.5) 40%,rgba(10,8,6,.15) 70%,transparent 100%)' }}
      />
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to right,rgba(10,8,6,.45) 0%,transparent 55%)' }}
      />

      {/* Gold ambient orb */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full pointer-events-none animate-light-drift"
        style={{
          top: '-100px', right: '5%',
          background: 'radial-gradient(circle,rgba(184,154,106,.14) 0%,transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ══════════════════════════════
          LUMINA BOT — hero centrepiece
          Floats at right-centre of hero,
          above the glass cards column.
      ══════════════════════════════ */}
      <motion.div
        className="absolute z-[20] pointer-events-none
                   right-[clamp(16px,6vw,100px)]
                   top-1/2 -translate-y-[52%]
                   max-lg:right-4 max-lg:top-[14%] max-lg:translate-y-0
                   max-md:opacity-25"
        style={{ y: botY }}
      >
        {/* Soft radial backdrop behind bot */}
        <div
          className="absolute -inset-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(184,154,106,0.08) 0%, transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <LuminaBot />
      </motion.div>

      {/* ── Main content grid ── */}
      <motion.div
        className="relative z-10 w-full max-w-[1280px] mx-auto px-[72px] pb-20
                   max-md:px-6 max-md:pb-16
                   grid grid-cols-[1fr_340px] gap-16 items-end
                   max-lg:grid-cols-1 max-lg:gap-0"
        style={{ y: textY }}
      >
        {/* LEFT — headline + CTAs */}
        <div>
          <motion.div
            className="flex items-center gap-3.5 mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 1.6 }}
          >
            <span className="eyeline" />
            <span className="label-text">Toronto&apos;s Premier Smile Studio</span>
          </motion.div>

          <motion.h1
            className="font-serif-display text-white mb-8 overflow-hidden"
            style={{ fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {WORDS.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={wordReveal}
                  transition={{ delay: 1.65 + i * 0.13 }}
                  style={i >= 2 ? { color: '#d4b98a', fontStyle: 'italic' } : {}}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="text-white/52 font-light leading-[1.8] max-w-[420px] mb-12"
            style={{ fontSize: 16 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 2.2 }}
          >
            Precision dentistry blended with an unhurried, boutique experience — for patients who expect more than ordinary care.
          </motion.p>

          <motion.div
            className="flex gap-3.5 flex-wrap mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 2.4 }}
          >
            <MagneticButton href="#cta" className="btn-gold">
              Reserve Your Visit <span>→</span>
            </MagneticButton>
            <MagneticButton href="#ba" className="btn-outline">
              View Results <span>↓</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex gap-11 pt-9 border-t border-white/8 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 2.55 }}
          >
            {[
              { target: 12,   suffix: '+', decimal: 0, label: 'Years of mastery' },
              { target: 4800, suffix: '+', decimal: 0, label: 'Smiles transformed' },
              { target: 497,  suffix: '★', decimal: 2, label: 'Average rating' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-serif-display text-white" style={{ fontSize: 38, lineHeight: 1 }}>
                  <AnimatedCounter target={s.target} suffix={s.suffix} decimal={s.decimal} />
                </div>
                <div className="text-[10px] text-white/35 mt-1.5 tracking-[0.08em]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Glass info cards (below the bot) */}
        <motion.div
          className="flex flex-col gap-4 pb-2 max-lg:hidden"
          style={{ y: cardsY }}
        >
          <motion.div
            className="glass-card p-5 px-6 animate-float-a"
            variants={glassCardReveal} custom={0} initial="hidden" animate="show"
          >
            <div className="text-[11px] text-gold tracking-[3px] mb-2">★★★★★</div>
            <div className="text-[12px] text-white/65 leading-relaxed italic mb-1.5">
              &ldquo;Completely transformed how I feel about my smile. Genuinely life-changing.&rdquo;
            </div>
            <div className="text-[10px] text-white/30">— Priya S., Invisalign patient</div>
          </motion.div>

          <motion.div
            className="glass-card p-5 px-6 animate-float-b"
            variants={glassCardReveal} custom={1} initial="hidden" animate="show"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-live-pulse" />
              <span className="text-[10px] font-medium text-gold-lt tracking-[0.1em]">Accepting Patients</span>
            </div>
            <div className="text-[14px] font-medium text-white">Next available</div>
            <div className="text-[11px] text-white/35 mt-0.5">Tuesday, July 1 · 10:00 AM</div>
          </motion.div>

          <motion.div
            className="glass-card p-5 px-6 animate-float-c"
            variants={glassCardReveal} custom={2} initial="hidden" animate="show"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-serif-display text-white" style={{ fontSize: 40, lineHeight: 1 }}>98%</span>
              <span className="text-[11px] text-white/35 leading-snug">Patient<br />satisfaction rate</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 3.2 }}
      >
        <span className="text-[8px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
        <span className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent animate-scroll-line" />
      </motion.div>
    </section>
  )
}
