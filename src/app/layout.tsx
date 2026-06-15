import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "Lumina Dental — Toronto's Premier Smile Studio",
  description:
    "Precision dentistry blended with an unhurried, boutique experience. Porcelain veneers, Invisalign, implants & complete smile design in Toronto.",
  keywords: ["dental", "Toronto", "veneers", "Invisalign", "smile design", "implants"],
  openGraph: {
    title: "Lumina Dental — Toronto's Premier Smile Studio",
    description: "Boutique precision dentistry in the heart of Toronto.",
    type: "website",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: '#0e0c0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
