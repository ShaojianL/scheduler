import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard! You are now signed in.</p>
    </div>
  )
} 