const COLS = [
  {
    title: 'Treatments',
    links: ['Porcelain Veneers','Invisalign®','Dental Implants','Teeth Whitening','Gum Contouring','CEREC Crowns'],
  },
  {
    title: 'Clinic',
    links: ['About Lumina','Dr. Mehrotra','Technology','Patient Stories','Pricing','Blog'],
  },
  {
    title: 'Visit',
    links: ['245 Yonge St, Suite 800','Toronto, ON M5B 2L7','(416) 555-0192','hello@luminadental.ca','Emergency Line'],
  },
]

export default function Footer() {
  return (
    <footer
      className="pt-20 pb-10"
      style={{ background: '#0e0c0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1200px] mx-auto px-15 max-md:px-6">
        <div className="grid gap-12 mb-16 max-md:grid-cols-2 max-sm:grid-cols-1" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>

          {/* Brand */}
          <div>
            <div className="font-serif-display text-[26px] text-white tracking-[0.08em] mb-4">
              LUMINA<span style={{ color: '#b89a6a' }}>✦</span>
            </div>
            <p className="text-[13px] text-white/28 leading-[1.85] font-light max-w-[240px]">
              Toronto&apos;s boutique smile studio. Where precision dentistry meets genuine, unhurried care. Every patient, every time.
            </p>
            <div className="flex gap-2.5 mt-6">
              {['in','ig','yt','fb'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] text-white/30 transition-all duration-200 hover:text-gold"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/22 mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-white/40 font-light hover:text-gold transition-colors duration-200"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-7 flex justify-between items-center flex-wrap gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 11, color: 'rgba(255,255,255,0.18)' }}
        >
          <span>© 2026 Lumina Dental Studio. All rights reserved.</span>
          <div className="flex gap-5">
            {['Privacy','Terms','Accessibility'].map(l => (
              <a key={l} href="#" className="hover:text-gold transition-colors duration-200">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
