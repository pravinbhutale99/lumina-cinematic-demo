'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   LUMINA BOT  v3  —  Premium cinematic healthcare mascot

   Tuning rationale vs v2:
   · Float:      -13px/5.0s  →  -20px/4.2s   (more visible, still graceful)
   · Breathing:  1.022/4.1s  →  1.045/3.6s   (chest clearly moves)
   · Spring:     s18/d8/m1.6 →  s28/d10/m1.2 (responsive but still silky)
   · Size:       200×252     →  240×280       (visual centrepiece weight)
   · Glow:       0.13 opacity → 0.22          (warmer ambient presence)
   · Pupil range: ±2.8       →  ±3.5          (more expressive tracking)
   · Head tilt:  ±7°         →  ±9°           (reads clearly in 3D)
   · Blink speed: 140ms      →  120ms         (crisper, more mechanical)
   · Mood cycle: 4.2s start  →  3.0s start    (quicker first expression)
   · Entrance delay: 2.0s    →  1.8s          (faster site feel)
───────────────────────────────────────────────────────────── */

type Mood = 'neutral' | 'happy' | 'curious'

/* Identical M Q structure on all three so Framer can tween between them */
const MOUTHS: Record<Mood, string> = {
  neutral: 'M 62 91 Q 80 97 98 91',   // soft resting curve
  happy:   'M 60 88 Q 80 106 100 88', // warm open smile
  curious: 'M 62 93 Q 80 86 98 93',   // raised, questioning
}

export default function LuminaBot() {

  /* ── Cursor tracking ─────────────────────────────── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // More responsive than v2 but still premium-smooth
  const SP = { stiffness: 28, damping: 10, mass: 1.2 }
  const curX = useSpring(rawX, SP)
  const curY = useSpring(rawY, SP)

  // Head tilt — slightly more expressive
  const headRotY = useTransform(curX, [-1, 1], [-9,  9])
  const headRotX = useTransform(curY, [-1, 1], [ 5, -5])

  // Pupil offsets — wider range = more expressive eyes
  const pupilDX = useTransform(curX, [-1, 1], [-3.5, 3.5])
  const pupilDY = useTransform(curY, [-1, 1], [-2.2, 2.2])

  // Derived cx/cy for left and right pupils
  const lCX = useTransform(pupilDX, v => 60  + v)
  const lCY = useTransform(pupilDY, v => 66  + v)
  const rCX = useTransform(pupilDX, v => 124 + v)
  const rCY = useTransform(pupilDY, v => 66  + v)

  /* ── Proximity glow ──────────────────────────────── */
  const proximity   = useMotionValue(0)
  const proxSpring  = useSpring(proximity, { stiffness: 32, damping: 14 })
  const glowOpacity = useTransform(proxSpring, [0, 1], [0.6, 1.0])
  const glowScale   = useTransform(proxSpring, [0, 1], [0.92, 1.1])

  const botRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)

      if (botRef.current) {
        const r    = botRef.current.getBoundingClientRect()
        const dist = Math.hypot(
          e.clientX - (r.left + r.width  / 2),
          e.clientY - (r.top  + r.height / 2)
        )
        proximity.set(Math.max(0, 1 - dist / 300))
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, proximity])

  /* ── Blink ───────────────────────────────────────── */
  const [blinking, setBlinking] = useState(false)
  const blinkRef = useRef<ReturnType<typeof setTimeout>>()

  const scheduleBlink = useCallback(() => {
    blinkRef.current = setTimeout(() => {
      setBlinking(true)
      setTimeout(() => {
        setBlinking(false)
        // Double-blink (25% chance) — organic, subtle
        if (Math.random() < 0.25) {
          setTimeout(() => {
            setBlinking(true)
            setTimeout(() => { setBlinking(false); scheduleBlink() }, 110)
          }, 180)
        } else {
          scheduleBlink()
        }
      }, 120)
    }, 3000 + Math.random() * 4200)
  }, [])

  useEffect(() => {
    // Wake-up blink at 1.4s — feels alive immediately
    blinkRef.current = setTimeout(() => {
      setBlinking(true)
      setTimeout(() => { setBlinking(false); scheduleBlink() }, 120)
    }, 1400)
    return () => clearTimeout(blinkRef.current)
  }, [scheduleBlink])

  /* ── Mood cycle ──────────────────────────────────── */
  const [mood,    setMood]    = useState<Mood>('neutral')
  const [talking, setTalking] = useState(false)
  const moodRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const cycle = () => {
      const pool: Mood[] = ['neutral', 'neutral', 'happy', 'curious', 'neutral', 'happy']
      const next = pool[Math.floor(Math.random() * pool.length)]
      setMood(next)
      if (next !== 'neutral') {
        setTalking(true)
        setTimeout(() => setTalking(false), 1500)
      }
      moodRef.current = setTimeout(cycle, 5000 + Math.random() * 5500)
    }
    // First mood shift earlier so users see it
    moodRef.current = setTimeout(cycle, 3000)
    return () => clearTimeout(moodRef.current)
  }, [])

  /* ── Derived eye params ──────────────────────────── */
  const eyeSY = blinking ? 0.05 : mood === 'happy' ? 0.35 : mood === 'curious' ? 1.3 : 1.0
  const eyeTY = mood === 'happy' ? 2 : 0
  const eyeT  = { duration: blinking ? 0.06 : 0.48, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <motion.div
      ref={botRef}
      className="relative select-none"
      style={{ width: 240, height: 290 }}
      /* Entrance — quicker, slightly lower entry point */
      initial={{ opacity: 0, y: 44, scale: 0.78 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
    >

      {/* ── Floor glow — synced to float ── */}
      <motion.div
        className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: 160, height: 24,
          background: 'radial-gradient(ellipse, rgba(184,154,106,0.42) 0%, transparent 68%)',
          filter: 'blur(10px)',
        }}
        animate={{ opacity: [0.35, 0.78, 0.35], scaleX: [0.80, 1.12, 0.80] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Ambient halo — brightens on cursor approach ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: -32,
          background: 'radial-gradient(ellipse at 50% 44%, rgba(184,154,106,0.22) 0%, transparent 58%)',
          filter: 'blur(24px)',
          opacity: glowOpacity,
          scale:   glowScale,
        }}
      />

      {/* ── Float: -20px travel, 4.2s ── */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >

        {/* ── Head tilt via CSS 3D ── */}
        <motion.div
          style={{
            rotateY: headRotY,
            rotateX: headRotX,
            transformPerspective: 900,
            transformStyle: 'preserve-3d',
            width: '100%', height: '100%',
          }}
        >

          {/* ── Breathing: 1.045 scaleY, 3.6s ── */}
          <motion.div
            style={{ width: '100%', height: '100%', transformOrigin: '50% 74%' }}
            animate={{ scaleY: [1, 1.045, 1], scaleX: [1, 0.982, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >

            {/* ── SVG: viewBox 192×230 ── */}
            <svg
              width="240"
              height="280"
              viewBox="0 0 192 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Warm platinum shell */}
                <linearGradient id="lbv3-shell" x1="0" y1="0" x2="0.55" y2="1">
                  <stop offset="0%"   stopColor="#f2efe9" />
                  <stop offset="50%"  stopColor="#e4dfd7" />
                  <stop offset="100%" stopColor="#cac4ba" />
                </linearGradient>

                {/* Specular highlight */}
                <radialGradient id="lbv3-spec" cx="33%" cy="23%" r="57%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.58)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
                </radialGradient>

                {/* Dark visor */}
                <linearGradient id="lbv3-visor" x1="0.04" y1="0" x2="0.5" y2="1">
                  <stop offset="0%"   stopColor="#201d19" />
                  <stop offset="100%" stopColor="#0c0a07" />
                </linearGradient>

                {/* Eye iris */}
                <radialGradient id="lbv3-iris" cx="44%" cy="36%" r="58%">
                  <stop offset="0%"   stopColor="#f0d8a0" />
                  <stop offset="40%"  stopColor="#c4a472" />
                  <stop offset="100%" stopColor="#8a6a3a" stopOpacity="0" />
                </radialGradient>

                {/* Gold accents */}
                <linearGradient id="lbv3-gold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#dcc090" />
                  <stop offset="50%"  stopColor="#b89a6a" />
                  <stop offset="100%" stopColor="#8a7248" />
                </linearGradient>

                {/* Neck */}
                <linearGradient id="lbv3-neck" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#e0dbd4" />
                  <stop offset="100%" stopColor="#c2bdb4" />
                </linearGradient>

                {/* FILTERS */}
                <filter id="lbv3-drop" x="-18%" y="-12%" width="136%" height="138%">
                  <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="rgba(0,0,0,0.30)" />
                </filter>
                <filter id="lbv3-bloom" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="lbv3-earsh" x="-14%" y="-14%" width="128%" height="128%">
                  <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.20)" />
                </filter>
                {/* Inner visor reflection */}
                <filter id="lbv3-glare" x="-5%" y="-5%" width="110%" height="110%">
                  <feGaussianBlur stdDeviation="1" />
                </filter>
              </defs>

              {/* ════ BODY ════ */}
              <rect x="26" y="126" width="140" height="96" rx="48"
                fill="url(#lbv3-shell)" filter="url(#lbv3-drop)" />
              <rect x="26" y="126" width="140" height="96" rx="48"
                fill="url(#lbv3-spec)" />
              <rect x="26" y="126" width="140" height="96" rx="48"
                fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

              {/* Chest gold stripe */}
              <motion.rect x="60" y="182" width="72" height="4" rx="2"
                fill="url(#lbv3-gold)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Status dot */}
              <motion.circle cx="96" cy="206" r="4.5" fill="#4ade80"
                animate={{ opacity: [0.55, 1, 0.55], r: [3.8, 5.2, 3.8] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Status ring */}
              <motion.circle cx="96" cy="206" r="9"
                fill="rgba(74,222,128,0.12)"
                animate={{ r: [7, 12, 7], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut' }}
              />

              {/* ════ NECK ════ */}
              <rect x="76" y="116" width="40" height="18" rx="9"
                fill="url(#lbv3-neck)" />
              <rect x="76" y="116" width="40" height="18" rx="9"
                fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />

              {/* ════ HEAD SHELL ════ */}
              <rect x="8" y="4" width="176" height="120" rx="38"
                fill="url(#lbv3-shell)" filter="url(#lbv3-drop)" />
              <rect x="8" y="4" width="176" height="120" rx="38"
                fill="url(#lbv3-spec)" />
              <rect x="8" y="4" width="176" height="120" rx="38"
                fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

              {/* Top gold accent pill */}
              <motion.rect x="64" y="5.5" width="64" height="5" rx="2.5"
                fill="url(#lbv3-gold)"
                animate={{ opacity: [0.42, 0.92, 0.42] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />

              {/* ════ ANTENNA ════ */}
              <motion.g
                animate={{ rotate: [-2.5, 2.5, -2.5] }}
                transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '96px 5px' }}
              >
                <line x1="96" y1="5" x2="96" y2="-12"
                  stroke="url(#lbv3-gold)" strokeWidth="2.4" strokeLinecap="round" />
                {/* Tip glow */}
                <motion.circle cx="96" cy="-17" r="5"
                  fill="url(#lbv3-gold)"
                  animate={{ r: [4.5, 6.5, 4.5], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Ping ring */}
                <motion.circle cx="96" cy="-17" r="5"
                  fill="none" stroke="rgba(184,154,106,0.55)" strokeWidth="1.5"
                  animate={{ r: [5, 14, 5], opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              </motion.g>

              {/* ════ VISOR ════ */}
              <rect x="24" y="20" width="144" height="96" rx="26"
                fill="url(#lbv3-visor)" />
              {/* Glass top sheen */}
              <rect x="24" y="20" width="144" height="36" rx="24"
                fill="rgba(255,255,255,0.042)" />
              {/* Gold border */}
              <rect x="24" y="20" width="144" height="96" rx="26"
                fill="none" stroke="rgba(184,154,106,0.30)" strokeWidth="1.2" />
              {/* Inner specular line */}
              <line x1="32" y1="30" x2="160" y2="30"
                stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />

              {/* ════ LEFT EYE ════ */}
              {/* Outer bloom */}
              <motion.ellipse cx="60" cy="66" rx="19" ry="17"
                fill="rgba(184,154,106,0.10)"
                filter="url(#lbv3-bloom)"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Iris */}
              <motion.ellipse cx="60" cy="66" rx="13.5" ry="12.5"
                fill="url(#lbv3-iris)"
                style={{ transformOrigin: '60px 66px' }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeT}
              />
              {/* Pupil — cursor-driven cx/cy */}
              <motion.circle
                r="6"
                fill="#100d0a"
                animate={{ scaleY: eyeSY }}
                style={{ transformOrigin: '60px 66px', cx: lCX, cy: lCY }}
                transition={eyeT}
              />
              {/* Primary specular */}
              <circle cx="65" cy="60" r="2.8" fill="rgba(255,255,255,0.80)" />
              {/* Secondary soft glint */}
              <circle cx="57" cy="72" r="1.4" fill="rgba(255,255,255,0.26)" />

              {/* ════ RIGHT EYE ════ */}
              <motion.ellipse cx="132" cy="66" rx="19" ry="17"
                fill="rgba(184,154,106,0.10)"
                filter="url(#lbv3-bloom)"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.ellipse cx="132" cy="66" rx="13.5" ry="12.5"
                fill="url(#lbv3-iris)"
                style={{ transformOrigin: '132px 66px' }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeT}
              />
              <motion.circle
                r="6"
                fill="#100d0a"
                animate={{ scaleY: eyeSY }}
                style={{ transformOrigin: '132px 66px', cx: rCX, cy: rCY }}
                transition={eyeT}
              />
              <circle cx="137" cy="60" r="2.8" fill="rgba(255,255,255,0.80)" />
              <circle cx="129" cy="72" r="1.4" fill="rgba(255,255,255,0.26)" />

              {/* ════ MOUTH ════ */}
              <motion.path
                d={MOUTHS[mood]}
                stroke="rgba(184,154,106,0.80)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{ d: MOUTHS[mood] }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Talking glow — always mounted, opacity-driven */}
              <motion.ellipse cx="80" cy="100" rx="22" ry="6"
                fill="rgba(184,154,106,0.16)"
                animate={{
                  opacity: talking ? [0, 0.9, 0, 0.9, 0] : 0,
                  scaleX:  talking ? [0.5, 1.25, 0.5, 1.25, 0.5] : 0.5,
                }}
                transition={{ duration: 0.36, repeat: talking ? 4 : 0 }}
              />

              {/* ════ EAR TABS ════ */}
              {/* Left */}
              <rect x="3"   y="40" width="9" height="34" rx="4.5"
                fill="url(#lbv3-shell)" filter="url(#lbv3-earsh)" />
              <rect x="3"   y="40" width="9" height="34" rx="4.5"
                fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
              <motion.rect x="5.5" y="49" width="4" height="16" rx="2"
                fill="url(#lbv3-gold)"
                animate={{ opacity: [0.40, 0.82, 0.40] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Right */}
              <rect x="180" y="40" width="9" height="34" rx="4.5"
                fill="url(#lbv3-shell)" filter="url(#lbv3-earsh)" />
              <rect x="180" y="40" width="9" height="34" rx="4.5"
                fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
              <motion.rect x="182.5" y="49" width="4" height="16" rx="2"
                fill="url(#lbv3-gold)"
                animate={{ opacity: [0.40, 0.82, 0.40] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />

            </svg>

          </motion.div>{/* /breathing */}
        </motion.div>{/* /head-tilt */}
      </motion.div>{/* /float */}

    </motion.div>
  )
}
