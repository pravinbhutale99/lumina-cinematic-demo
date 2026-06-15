'use client'
import { useRef, MouseEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', style, onClick, href, strength = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return
    const r  = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width  / 2)
    const dy = e.clientY - (r.top  + r.height / 2)
    ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    ref.current.style.transition = 'transform 0.5s cubic-bezier(.34,1.56,.64,1)'
    setTimeout(() => { if (ref.current) ref.current.style.transition = '' }, 500)
  }

  const Tag = href ? 'a' : 'button'
  const extraProps = href ? { href } : {}

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block' }}
    >
      <Tag className={className} style={style} onClick={onClick} {...extraProps}>
        {children}
      </Tag>
    </motion.div>
  )
}
