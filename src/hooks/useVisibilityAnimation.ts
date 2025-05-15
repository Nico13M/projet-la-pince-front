import { useEffect, useState } from 'react'

interface UseVisibilityAnimationProps {
  delay?: number
  initialVisible?: boolean
}

export function useVisibilityAnimation({
  delay = 100,
  initialVisible = false,
}: UseVisibilityAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(initialVisible)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return {
    isVisible,
    visibilityClasses: (customDelay?: number) => {
      const baseClasses = 'transition-all duration-700'
      const visibilityClasses = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'

      const delayClass = customDelay ? `animate-delay-${customDelay}` : ''

      return `${baseClasses} ${visibilityClasses} ${delayClass}`
    },
  }
}
