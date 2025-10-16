import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SeasonProvider } from '@/providers/SeasonProvider'
import { FallingLeaves } from '@/components/FallingLeaves'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Micro Motivator',
    default: 'Micro Motivator - Find Your Daily Inspiration',
  },
  description: 'A beautiful micro-motivator app with seasonal theming, breathing exercises, and mindfulness features to help you stay motivated throughout your day.',
  keywords: [
    'motivation',
    'mindfulness',
    'breathing exercises',
    'wellness',
    'productivity',
    'seasonal theming',
    'accessibility',
  ],
  authors: [{ name: 'Micro Motivator Team' }],
  creator: 'Micro Motivator',
  publisher: 'Micro Motivator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://micro-motivator.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Micro Motivator - Find Your Daily Inspiration',
    description: 'A beautiful micro-motivator app with seasonal theming and mindfulness features.',
    url: 'https://micro-motivator.app',
    siteName: 'Micro Motivator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Micro Motivator - Seasonal themed motivational app',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micro Motivator - Find Your Daily Inspiration',
    description: 'A beautiful micro-motivator app with seasonal theming and mindfulness features.',
    images: ['/og-image.png'],
    creator: '@micro_motivator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Add verification tokens here when needed
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-background via-background to-muted`}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="skip-to-content"
          tabIndex={1}
        >
          Skip to main content
        </a>
        
        <SeasonProvider>
          {/* Seasonal background animations */}
          <FallingLeaves />
          
          {/* Main application wrapper with glass effect */}
          <div className="relative min-h-screen">
            {/* Glass overlay for depth */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none" />
            
            {/* Main content area */}
            <main 
              id="main-content" 
              className="relative z-10 min-h-screen"
              tabIndex={-1}
            >
              {children}
            </main>
          </div>
        </SeasonProvider>
      </body>
    </html>
  )
}