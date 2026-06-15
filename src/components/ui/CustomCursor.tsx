'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef<number>()
  const isDown  = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 900) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const onDown = () => {
      isDown.current = true
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(0.6)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(0.8)'
    }
    const onUp = () => {
      isDown.current = false
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    const onEnterLink = () => {
      if (dotRef.current)  { dotRef.current.style.width = '6px'; dotRef.current.style.height = '6px' }
      if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px'; ringRef.current.style.borderColor = '#b89a6a' }
    }
    const onLeaveLink = () => {
      if (dotRef.current)  { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.borderColor = 'rgba(184,154,106,0.5)' }
    }

    // Animate ring with lerp
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    // Hover states for interactive elements
    const links = document.querySelectorAll('a, button')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none rounded-full"
        style={{
          width: 10, height: 10,
          background: '#b89a6a',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.3s, height 0.3s, transform 0.15s',
          top: 0, left: 0,
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none rounded-full"
        style={{
          width: 36, height: 36,
          border: '1px solid rgba(184,154,106,0.5)',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.4s cubic-bezier(.16,1,.3,1), height 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s, transform 0.3s',
          top: 0, left: 0,
        }}
        aria-hidden="true"
      />
    </>
  )
}
