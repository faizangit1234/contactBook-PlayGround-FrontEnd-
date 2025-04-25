// app/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl text-white px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">📇 ContactPlay</h1>
        <p className="text-lg text-gray-300 mb-8">
          Manage your contacts efficiently with your own secure contact book.
        </p>
        <Button>click me </Button>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacts"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold shadow"
          >
            View Contacts
          </Link>
          <Link
            href="/add-contact"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-xl text-white font-semibold shadow"
          >
            Add Contact
          </Link>
        </div>
      </div>
    </main>
  )
}
