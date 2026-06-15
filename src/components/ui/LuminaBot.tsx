'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

type Mood = 'neutral' | 'happy' | 'curious'

const MOUTHS: Record<Mood, string> = {
  neutral:  'M 57 85 Q 72 90 87 85',
  happy:    'M 55 82 Q 72 97 89 82',
  curious:  'M 57 87 Q 72 82 87 87',
}

export default function LuminaBot() {

  // Raw cursor -1..1
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Very soft spring — luxuriously slow follow
  const SP = { stiffness: 18, damping: 8, mass: 1.6 }
  const curX = useSpring(rawX, SP)
  const curY = useSpring(rawY, SP)

  // Head tilt
  const headRotY = useTransform(curX, [-1, 1], [-7, 7])
  const headRotX = useTransform(curY, [-1, 1], [4, -4])

  // Pupil offsets in SVG coords
  const pupilDX = useTransform(curX, [-1, 1], [-2.8, 2.8])
  const pupilDY = useTransform(curY, [-1, 1], [-1.8, 1.8])

  // Proximity glow
  const proximity = useMotionValue(0)
  const proxSpring = useSpring(proximity, { stiffness: 30, damping: 14 })
  const glowOpacity = useTransform(proxSpring, [0, 1], [0.55, 1.0])
  const glowScale   = useTransform(proxSpring, [0, 1], [0.94, 1.08])

  // Blink
  const [blinking, setBlinking] = useState(false)
  const blinkRef = useRef<ReturnType<typeof setTimeout>>()
  const scheduleBlink = useCallback(() => {
    blinkRef.current = setTimeout(() => {
      setBlinking(true)
      setTimeout(() => {
        setBlinking(false)
        if (Math.random() < 0.22) {
          setTimeout(() => {
            setBlinking(true)
            setTimeout(() => { setBlinking(false); scheduleBlink() }, 120)
          }, 200)
        } else {
          scheduleBlink()
        }
      }, 140)
    }, 3200 + Math.random() * 4500)
  }, [])

  // Mood
  const [mood, setMood]       = useState<Mood>('neutral')
  const [talking, setTalking] = useState(false)
  const moodRef = useRef<ReturnType<typeof setTimeout>>()
  const botRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
      if (botRef.current) {
        const r = botRef.current.getBoundingClientRect()
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
        proximity.set(Math.max(0, 1 - dist / 280))
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, proximity])

  useEffect(() => {
    blinkRef.current = setTimeout(() => {
      setBlinking(true)
      setTimeout(() => { setBlinking(false); scheduleBlink() }, 140)
    }, 1600)
    return () => clearTimeout(blinkRef.current)
  }, [scheduleBlink])

  useEffect(() => {
    const cycle = () => {
      const pool: Mood[] = ['neutral','neutral','happy','curious','neutral','happy']
      const next = pool[Math.floor(Math.random() * pool.length)]
      setMood(next)
      if (next !== 'neutral') { setTalking(true); setTimeout(() => setTalking(false), 1400) }
      moodRef.current = setTimeout(cycle, 5500 + Math.random() * 5000)
    }
    moodRef.current = setTimeout(cycle, 4200)
    return () => clearTimeout(moodRef.current)
  }, [])

  // Derived eye params
  const eyeSY = blinking ? 0.05 : mood === 'happy' ? 0.38 : mood === 'curious' ? 1.28 : 1.0
  const eyeTY = mood === 'happy' ? 1.5 : 0
  const eyeTr = { duration: blinking ? 0.065 : 0.5, ease: [0.16, 1, 0.3, 1] as const }

  // Motion-value-driven cx/cy for pupils
  const lPupilCX = useTransform(pupilDX, v => 52  + v)
  const lPupilCY = useTransform(pupilDY, v => 57  + v)
  const rPupilCX = useTransform(pupilDX, v => 108 + v)
  const rPupilCY = useTransform(pupilDY, v => 57  + v)

  return (
    <motion.div
      ref={botRef}
      className="relative select-none"
      style={{ width: 200, height: 252 }}
      initial={{ opacity: 0, y: 52, scale: 0.80 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
    >

      {/* Floor shadow */}
      <motion.div
        className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: 140, height: 22,
          background: 'radial-gradient(ellipse, rgba(184,154,106,0.40) 0%, transparent 70%)',
          filter: 'blur(9px)',
        }}
        animate={{ opacity: [0.4, 0.82, 0.4], scaleX: [0.82, 1.10, 0.82] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient halo — brighter near cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: -28,
          background: 'radial-gradient(ellipse at 50% 44%, rgba(184,154,106,0.16) 0%, transparent 60%)',
          filter: 'blur(22px)',
          opacity: glowOpacity,
          scale:   glowScale,
        }}
      />

      {/* Float */}
      <motion.div
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >

        {/* Head tilt — CSS 3D */}
        <motion.div
          style={{
            rotateY: headRotY,
            rotateX: headRotX,
            transformPerspective: 800,
            transformStyle: 'preserve-3d',
            width: '100%', height: '100%',
          }}
        >

          {/* Breathing — scaleY on full SVG */}
          <motion.div
            style={{ width: '100%', height: '100%', transformOrigin: '50% 75%' }}
            animate={{ scaleY: [1, 1.022, 1], scaleX: [1, 0.990, 1] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
          >

            <svg width="200" height="240" viewBox="0 0 160 192" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Shell — warm platinum */}
                <linearGradient id="lb-shell" x1="0" y1="0" x2="0.55" y2="1">
                  <stop offset="0%"   stopColor="#f0ede7" />
                  <stop offset="50%"  stopColor="#e2ddd5" />
                  <stop offset="100%" stopColor="#c8c2b8" />
                </linearGradient>
                {/* Specular */}
                <radialGradient id="lb-spec" cx="34%" cy="24%" r="56%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
                </radialGradient>
                {/* Visor dark */}
                <linearGradient id="lb-visor" x1="0.05" y1="0" x2="0.5" y2="1">
                  <stop offset="0%"   stopColor="#1e1b17" />
                  <stop offset="100%" stopColor="#0b0906" />
                </linearGradient>
                {/* Iris */}
                <radialGradient id="lb-iris" cx="46%" cy="38%" r="58%">
                  <stop offset="0%"   stopColor="#eecf96" />
                  <stop offset="45%"  stopColor="#b89a6a" />
                  <stop offset="100%" stopColor="#7a6038" stopOpacity="0" />
                </radialGradient>
                {/* Gold */}
                <linearGradient id="lb-gold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#d4b98a" />
                  <stop offset="50%"  stopColor="#b89a6a" />
                  <stop offset="100%" stopColor="#8a7248" />
                </linearGradient>
                {/* Neck */}
                <linearGradient id="lb-neck" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#dedad3" />
                  <stop offset="100%" stopColor="#bfbab1" />
                </linearGradient>
                {/* Drop shadow */}
                <filter id="lb-drop" x="-18%" y="-10%" width="136%" height="136%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.27)" />
                </filter>
                {/* Eye bloom */}
                <filter id="lb-bloom" x="-55%" y="-55%" width="210%" height="210%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* Ear shadow */}
                <filter id="lb-earsh" x="-12%" y="-12%" width="124%" height="124%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.18)" />
                </filter>
              </defs>

              {/* ── BODY ── */}
              <rect x="22" y="106" width="116" height="78" rx="40"
                fill="url(#lb-shell)" filter="url(#lb-drop)" />
              <rect x="22" y="106" width="116" height="78" rx="40"
                fill="url(#lb-spec)" />
              <rect x="22" y="106" width="116" height="78" rx="40"
                fill="none" stroke="rgba(255,255,255,0.17)" strokeWidth="1" />
              {/* Chest stripe */}
              <motion.rect x="50" y="154" width="60" height="3.5" rx="1.75"
                fill="url(#lb-gold)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
              {/* Status dot */}
              <motion.circle cx="80" cy="174" r="3.8" fill="#4ade80"
                animate={{ opacity: [0.6, 1, 0.6], r: [3.2, 4.4, 3.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
              <circle cx="80" cy="174" r="8" fill="rgba(74,222,128,0.13)" />

              {/* ── NECK ── */}
              <rect x="63" y="98" width="34" height="16" rx="8"
                fill="url(#lb-neck)" />
              <rect x="63" y="98" width="34" height="16" rx="8"
                fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />

              {/* ── HEAD SHELL ── */}
              <rect x="8" y="4" width="144" height="100" rx="32"
                fill="url(#lb-shell)" filter="url(#lb-drop)" />
              <rect x="8" y="4" width="144" height="100" rx="32"
                fill="url(#lb-spec)" />
              <rect x="8" y="4" width="144" height="100" rx="32"
                fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1" />
              {/* Top accent */}
              <motion.rect x="54" y="5.5" width="52" height="4" rx="2"
                fill="url(#lb-gold)"
                animate={{ opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />

              {/* ── ANTENNA ── */}
              <motion.g
                animate={{ rotate: [-2.5, 2.5, -2.5] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '80px 5px' }}
              >
                <line x1="80" y1="5" x2="80" y2="-10"
                  stroke="url(#lb-gold)" strokeWidth="2.2" strokeLinecap="round" />
                <motion.circle cx="80" cy="-14" r="4" fill="url(#lb-gold)"
                  animate={{ r: [3.8, 5.2, 3.8], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.circle cx="80" cy="-14" r="4"
                  fill="none" stroke="rgba(184,154,106,0.5)" strokeWidth="1.5"
                  animate={{ r: [4, 12, 4], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }} />
              </motion.g>

              {/* ── VISOR ── */}
              <rect x="22" y="18" width="116" height="80" rx="22"
                fill="url(#lb-visor)" />
              <rect x="22" y="18" width="116" height="30" rx="20"
                fill="rgba(255,255,255,0.045)" />
              <rect x="22" y="18" width="116" height="80" rx="22"
                fill="none" stroke="rgba(184,154,106,0.28)" strokeWidth="1" />
              <line x1="28" y1="27" x2="132" y2="27"
                stroke="rgba(255,255,255,0.055)" strokeWidth="1" />

              {/* ── LEFT EYE ── */}
              <motion.ellipse cx="52" cy="58" rx="15" ry="14"
                fill="rgba(184,154,106,0.09)" filter="url(#lb-bloom)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
              {/* Iris */}
              <motion.ellipse cx="52" cy="58" rx="11" ry="10.5"
                fill="url(#lb-iris)"
                style={{ transformOrigin: '52px 58px' }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeTr} />
              {/* Pupil — motion-value driven cx/cy */}
              <motion.ellipse rx="5" ry="5" fill="#0f0d0b"
                style={{
                  transformOrigin: '52px 58px',
                  cx: lPupilCX,
                  cy: lPupilCY,
                }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeTr} />
              <circle cx="56.5" cy="52.5" r="2.2" fill="rgba(255,255,255,0.76)" />
              <circle cx="50"   cy="63"   r="1.1" fill="rgba(255,255,255,0.24)" />

              {/* ── RIGHT EYE ── */}
              <motion.ellipse cx="108" cy="58" rx="15" ry="14"
                fill="rgba(184,154,106,0.09)" filter="url(#lb-bloom)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
              <motion.ellipse cx="108" cy="58" rx="11" ry="10.5"
                fill="url(#lb-iris)"
                style={{ transformOrigin: '108px 58px' }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeTr} />
              <motion.ellipse rx="5" ry="5" fill="#0f0d0b"
                style={{
                  transformOrigin: '108px 58px',
                  cx: rPupilCX,
                  cy: rPupilCY,
                }}
                animate={{ scaleY: eyeSY, y: eyeTY }}
                transition={eyeTr} />
              <circle cx="112.5" cy="52.5" r="2.2" fill="rgba(255,255,255,0.76)" />
              <circle cx="106"   cy="63"   r="1.1" fill="rgba(255,255,255,0.24)" />

              {/* ── MOUTH ── */}
              <motion.path
                d={MOUTHS[mood]}
                stroke="rgba(184,154,106,0.76)"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                animate={{ d: MOUTHS[mood] }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              {/* Talking glow — always mounted */}
              <motion.ellipse cx="80" cy="91" rx="18" ry="5"
                fill="rgba(184,154,106,0.15)"
                animate={{
                  opacity: talking ? [0, 0.8, 0, 0.8, 0] : [0],
                  scaleX:  talking ? [0.6, 1.2, 0.6, 1.2, 0.6] : [0.6],
                }}
                transition={{ duration: 0.38, repeat: talking ? 3 : 0 }} />

              {/* ── EAR TABS ── */}
              {/* Left */}
              <rect x="3"   y="36" width="8" height="28" rx="4"
                fill="url(#lb-shell)" filter="url(#lb-earsh)" />
              <rect x="3"   y="36" width="8" height="28" rx="4"
                fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
              <motion.rect x="5" y="43" width="4" height="14" rx="2"
                fill="url(#lb-gold)"
                animate={{ opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} />
              {/* Right */}
              <rect x="149" y="36" width="8" height="28" rx="4"
                fill="url(#lb-shell)" filter="url(#lb-earsh)" />
              <rect x="149" y="36" width="8" height="28" rx="4"
                fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
              <motion.rect x="151" y="43" width="4" height="14" rx="2"
                fill="url(#lb-gold)"
                animate={{ opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />

            </svg>

          </motion.div>
        </motion.div>
      </motion.div>

    </motion.div>
  )
}
