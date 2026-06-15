export const IMAGES = {
  heroBg:    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1800&q=85&auto=format&fit=crop',
  featuredTx:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=85&auto=format&fit=crop',
  doctor:    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85&auto=format&fit=crop&crop=top',
  gallery: [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&q=80&auto=format&fit=crop',
  ],
  ba: [
    {
      before: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=75&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1581391218120-1087d6a580a8?w=400&q=75&auto=format&fit=crop',
    },
    {
      before: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=75&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=75&auto=format&fit=crop',
    },
    {
      before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=75&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=75&auto=format&fit=crop',
    },
  ],
  avatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop&crop=face',
  ],
}

export const TREATMENTS = [
  { num: '01', icon: '◎', title: 'Porcelain Veneers',     desc: 'Ultra-thin ceramic shells that correct shape, colour and spacing without aggressive drilling.' },
  { num: '02', icon: '◑', title: 'Invisalign®',           desc: 'AI-mapped clear aligners worn just 20 hours a day. Invisible alignment, remarkable results.' },
  { num: '03', icon: '⊙', title: 'Dental Implants',       desc: 'Titanium-root implants placed with 3D guided surgery. Permanent, natural, indistinguishable.' },
  { num: '04', icon: '✦', title: 'Professional Whitening', desc: 'In-chair LED whitening — up to 8 shades brighter in 60 minutes. Zero sensitivity protocol.' },
  { num: '05', icon: '⊕', title: 'Gum Contouring',        desc: 'Laser reshaping of the gumline. Reveal proportional teeth. Minimal downtime.' },
  { num: '06', icon: '⊗', title: 'CEREC Same-Day Crowns', desc: 'Designed, milled, and placed in a single visit. No temporaries. No second appointment.' },
]

export const TESTIMONIALS = [
  {
    quote: '"I put off dental work for years out of anxiety. Lumina changed that entirely. I felt cared for from the first minute."',
    name: 'Anika R.', role: 'Porcelain Veneers · North York', av: 0,
    avatarBg: 'from-[#6b5a3e] to-[#9c7d55]',
  },
  {
    quote: '"The 3D preview was incredible — seeing my future smile before committing made everything easy. Results matched it exactly."',
    name: 'James T.', role: 'Smile Design · Yorkville', av: 1,
    avatarBg: 'from-[#3a5a6b] to-[#557d9c]',
  },
  {
    quote: '"Eleven months of Invisalign and the results are flawless. The team checked in regularly — genuinely felt like a personal service."',
    name: 'Maya L.', role: 'Invisalign® · The Annex', av: 2,
    avatarBg: 'from-[#3a6b4a] to-[#559c65]',
  },
  {
    quote: '"Emergency broken tooth on Saturday — they had me in by 10am with a same-day crown. Calm, exceptional care."',
    name: 'Sebastian M.', role: 'Emergency · Rosedale', av: 3,
    avatarBg: 'from-[#6b3a3a] to-[#9c5555]',
  },
  {
    quote: '"I flew from Vancouver specifically for Lumina. Worth every kilometre. My smile is completely unrecognisable — in the most wonderful way."',
    name: 'Claire W.', role: 'Complete Makeover · Vancouver', av: 4,
    avatarBg: 'from-[#3a3a6b] to-[#55559c]',
  },
]

export const BA_CASES = [
  { title: "Emily's Smile Makeover",   desc: 'Discolouration and uneven edges corrected. Natural-looking result in two visits.',    chip: '✦ Porcelain Veneers × 8' },
  { title: "Marcus's Alignment",       desc: 'Crowding and crossbite resolved over 14 months with clear aligners. Perfectly retained.', chip: '◑ Invisalign® Comprehensive' },
  { title: "Claire's Full Restoration", desc: 'Five missing teeth replaced with implant-supported crowns. Bite fully restored.',       chip: '⊙ Implants + Crowns × 5' },
]

export const MARQUEE_ITEMS = [
  'Porcelain Veneers', 'Invisalign®', 'Dental Implants',
  'Smile Design', 'CEREC Crowns', 'Teeth Whitening',
  'Gum Contouring', 'Emergency Care',
]

export const GALLERY_LABELS = ['Reception', 'Treatment Suite', '3D Scanning']

export const CREDENTIALS = [
  'MSc in Aesthetic Dentistry — King\'s College London',
  'Fellow of the Royal College of Dental Surgeons of Ontario',
  'Certified Invisalign® Diamond Provider — Top 1% in Canada',
  'Digital Smile Design® Certified Practitioner',
]
