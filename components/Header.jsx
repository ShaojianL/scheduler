"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  // Determine where to redirect when clicking Scheduler
  const getSchedulerLink = () => {
    // If on sign-in or sign-up pages, always go to home
    if (pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')) {
      return '/'
    }
    // For authenticated users, go to dashboard
    return '/dashboard'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <SignedIn>
            <Link href={getSchedulerLink()} className="hover:opacity-80 transition-opacity duration-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">
                  Scheduler
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Organize your time</p>
              </div>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">
                  Scheduler
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Organize your time</p>
              </div>
            </Link>
          </SignedOut>
        </div>
        
        <div className="flex items-center space-x-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
              >
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                Dashboard
              </Button>
            </Link>
            <div className="ml-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 shadow-md"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
} 