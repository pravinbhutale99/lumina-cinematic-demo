import { MARQUEE_ITEMS } from '@/lib/constants'

const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export default function MarqueeStrip() {
  return (
    <div
      className="relative z-10 overflow-hidden py-[18px]"
      style={{
        background: 'rgba(184,154,106,0.06)',
        borderTop: '1px solid rgba(184,154,106,0.18)',
        borderBottom: '1px solid rgba(184,154,106,0.18)',
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-[18px] px-8 font-serif-display text-[17px] text-white/35 whitespace-nowrap border-r"
            style={{ borderColor: 'rgba(184,154,106,0.18)', letterSpacing: '0.04em' }}
          >
            <span style={{ color: '#b89a6a', fontSize: 12 }}>✦</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
