import { Button } from "./ui/button";
function MyButton() {
  return (
    <Button>
      I am a button
    </Button>
  );
}
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
          for housekeeping services
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          In progress...
        </p>
        <MyButton />
      </div>
    </div>
  );
} 