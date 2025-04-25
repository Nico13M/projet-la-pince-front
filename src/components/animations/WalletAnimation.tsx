'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet } from 'lucide-react'

export default function WalletAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }

    startAnimation()
    const interval = setInterval(startAnimation, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-40 w-40 mx-auto my-4">
      {/* Wallet */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            scale: isAnimating ? 1.05 : 1,
            y: isAnimating ? -2 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <Wallet className="w-24 h-24 text-primary" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Dollars */}
      <AnimatePresence>
        {[0, 1, 2].map((index) => (
          isAnimating && (
            <motion.div
              key={index}
              className="absolute text-4xl font-bold text-green-600"
              initial={{ 
                top: -30,
                left: `${50 + (index - 1) * 30}%`,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                top: ['0%', '40%', '60%'],
                left: ['50%', '50%', '50%'],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                times: [0, 0.6, 1],
                ease: "easeInOut"
              }}
            >
              $
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-28 h-2 bg-black/10 rounded-full transform -translate-x-1/2"
        animate={{
          width: isAnimating ? '6rem' : '7rem',
          opacity: isAnimating ? 0.15 : 0.1
        }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
} 