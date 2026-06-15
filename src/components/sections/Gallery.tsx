'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { IMAGES, GALLERY_LABELS } from '@/lib/constants'

const BG_FALLBACKS = [
  'linear-gradient(145deg,#1a2535,#0d1a28)',
  'linear-gradient(145deg,#1e2018,#141410)',
  'linear-gradient(145deg,#1a2018,#101810)',
]

export default function Gallery() {
  return (
    <div id="gallery" className="overflow-hidden" style={{ height: 440 }}>
      <div className="h-full grid max-md:grid-cols-1 max-md:h-auto" style={{ gridTemplateColumns: '1.3fr 1fr 1fr' }}>
        {IMAGES.gallery.map((src, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden group max-md:h-[200px]"
            style={{ background: BG_FALLBACKS[i] }}
            whileHover="hover"
          >
            <motion.div
              className="absolute inset-0"
              variants={{ hover: { scale: 1.06 } }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={src}
                alt={GALLERY_LABELS[i]}
                fill
                sizes={i === 0 ? '40vw' : '30vw'}
                quality={75}
                className="object-cover opacity-0 transition-opacity duration-700"
                style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                onLoad={e => {
                  const img = e.target as HTMLImageElement
                  img.style.opacity = '1'
                }}
              />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to top,rgba(10,8,6,.7) 0%,transparent 50%)' }} />

            {/* Label */}
            <motion.span
              className="absolute bottom-6 left-7 z-[3] font-serif-display text-[22px] text-white/80 tracking-[0.02em]"
              variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 8, opacity: 0 } }}
              initial="initial"
              transition={{ duration: 0.4 }}
            >
              {GALLERY_LABELS[i]}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
