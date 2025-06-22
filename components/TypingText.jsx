'use client'

import { useState, useEffect } from 'react'

export default function TypingText({ text, speed = 100, delay = 1000 }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isTyping) {
      // Start typing after initial delay
      const startTimer = setTimeout(() => {
        setIsTyping(true)
      }, delay)

      return () => clearTimeout(startTimer)
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      // Reset after typing is complete
      const resetTimer = setTimeout(() => {
        setDisplayText('')
        setCurrentIndex(0)
        setIsTyping(false)
      }, 3000) // Wait 3 seconds before restarting

      return () => clearTimeout(resetTimer)
    }
  }, [currentIndex, isTyping, text, speed, delay])

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
} 