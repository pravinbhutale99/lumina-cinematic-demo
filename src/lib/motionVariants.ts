import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show:   { y: '0%',   opacity: 1, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
}

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
}

export const glassCardReveal: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.18 },
  }),
}

export const SPRING = { type: 'spring', stiffness: 180, damping: 24 }
export const SPRING_SOFT = { type: 'spring', stiffness: 80, damping: 18 }
