'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  target: number
  suffix?: string
  decimal?: number   // divide by 10^decimal for display
  duration?: number  // ms
  className?: string
}

export default function AnimatedCounter({
  target, suffix = '+', decimal = 0, duration = 1800, className = ''
}: Props) {
  const ref        = useRef<HTMLSpanElement>(null)
  const inView     = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(0)
  const started    = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  const display = decimal > 0
    ? (val / Math.pow(10, decimal)).toFixed(decimal)
    : val.toLocaleString()

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}
