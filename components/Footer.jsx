import TypingText from './TypingText'

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 h-16 border-t bg-gray-50">
      <p className="text-gray-600 text-sm">
        <TypingText 
          text="功能正在完善中..." 
          speed={80} 
          delay={500}
        />
      </p>
    </footer>
  )
} 