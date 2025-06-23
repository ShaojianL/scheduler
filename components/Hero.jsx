import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-[family-name:var(--font-inter)]">
          Professional
          <br />
          <span className="text-blue-600 dark:text-blue-400">Scheduling</span>
          <br />
          for Clinics
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          After login, there will be two sides, one is the administrator, the other is the patient. The administrator can manage the patient, and the patient can view their appointment information.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
} 