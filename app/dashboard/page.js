export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard 暂时空白</h1>
      <p className="text-gray-600">Welcome to your dashboard!</p>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Some content</h2>
        <p className="text-gray-500">Some events.</p>
      </div>
      
      <div className="mt-6 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <p className="text-gray-500">• Create new event</p>
          <p className="text-gray-500">• View calendar</p>
          <p className="text-gray-500">• Manage settings</p>
        </div>
      </div>
    </div>
  )
} 