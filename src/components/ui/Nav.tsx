'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Treatments',  href: '#treatments' },
  { label: 'Results',     href: '#ba' },
  { label: 'Our Doctor',  href: '#doctor' },
  { label: 'Reviews',     href: '#testimonials' },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  const lenis = (window as unknown as Record<string, { scrollTo: (el: Element, opts: object) => void }>).__lenis
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Nav() {
  const [solid, setSolid]   = useState(false)
  const [mOpen, setMOpen]   = useState(false)
  const [entered, setEntered] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Delay nav reveal until loader done
    const t = setTimeout(() => setEntered(true), 1800)

    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])

  const handleLink = (href: string) => {
    setMOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <motion.header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-12 max-md:px-6"
        style={{ height: 72 }}
        animate={solid
          ? { background: 'rgba(14,12,10,0.88)', backdropFilter: 'blur(24px) saturate(1.4)', borderBottom: '1px solid rgba(184,154,106,0.18)' }
          : { background: 'transparent', backdropFilter: 'blur(0px)', borderBottom: '1px solid transparent' }
        }
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="font-serif-display text-[21px] tracking-[0.1em] text-white"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          LUMINA<em className="not-italic" style={{ color: '#b89a6a' }}>✦</em>
        </motion.a>

        {/* Desktop links */}
        <motion.nav
          className="hidden md:flex gap-9"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              className="text-[12px] text-white/55 tracking-[0.06em] relative group transition-colors hover:text-white/90"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          ))}
        </motion.nav>

        {/* CTA */}
        <motion.a
          href="#cta"
          onClick={e => { e.preventDefault(); scrollTo('#cta') }}
          className="hidden md:flex items-center gap-2 px-5 rounded-full text-[12px] text-white/70 tracking-[0.06em]
                     border border-[rgba(184,154,106,0.18)] h-[38px]
                     hover:border-gold hover:text-white hover:bg-[rgba(184,154,106,0.1)]
                     transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Book Consultation <span>→</span>
        </motion.a>

        {/* Hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMOpen(v => !v)}
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white/70 transition-transform duration-300 ${mOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-white/70 transition-opacity duration-300 ${mOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/70 transition-transform duration-300 ${mOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </motion.button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mOpen && (
          <motion.div
            className="fixed inset-0 z-[490] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(14,12,10,0.97)', backdropFilter: 'blur(30px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="font-serif-display text-[42px] text-white hover:text-gold transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.a
              href="#cta"
              onClick={e => { e.preventDefault(); handleLink('#cta') }}
              className="font-serif-display text-[42px]"
              style={{ color: '#b89a6a' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LINKS.length * 0.08, duration: 0.5 }}
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
