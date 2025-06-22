import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 border-b bg-white">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Scheduler</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
} 