'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setDone(true), 400)
      }
      setProgress(Math.round(current))
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[8000] bg-ink flex flex-col items-center justify-center gap-7"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="font-serif-display text-[28px] tracking-[0.18em] text-white"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            LUMINA<span style={{ color: '#b89a6a' }}>✦</span>
          </motion.div>

          <motion.div
            className="w-[110px] h-px bg-white/8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg,#8a7248,#b89a6a,#d4b98a)',
                width: `${progress}%`,
                transition: 'width 0.06s linear',
              }}
            />
          </motion.div>

          <motion.div
            className="text-[10px] tracking-[0.2em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
