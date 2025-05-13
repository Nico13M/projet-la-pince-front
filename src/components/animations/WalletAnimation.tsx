'use client'

import { formatEuro } from '@/utils/format'
import { AnimatePresence, motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BudgetWalletAnimation() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="group relative mx-auto my-8 h-48 w-48">
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            y: isActive ? -8 : 0,
            scale: isActive ? 1.03 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 15,
          }}
        >
          <Wallet className="text-primary/90 h-32 w-32 stroke-[1.3]" />

          <motion.div
            className="absolute top-4 right-4 left-4 h-1 rounded-full bg-green-100"
            animate={{
              width: isActive ? ['40%', '85%'] : '40%',
              opacity: isActive ? [0.8, 0.4] : 0,
            }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isActive && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-8 w-8 rounded-lg border border-green-200 bg-green-50"
                initial={{
                  opacity: 0,
                  x: -60 + i * 60,
                  y: -40,
                  scale: 0.7,
                  rotate: -15 + i * 15,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: 80,
                  scale: [0.7, 1.1, 0.9],
                  x: '50%',
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.0,
                  delay: i * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center font-medium text-green-600">
                  €
                </div>
              </motion.div>
            ))}

            <motion.div
              className="absolute top-[15%] left-1/2 -translate-x-1/2 text-xl font-semibold text-green-700"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -20,
                scale: [0.9, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                delay: 0.2,
              }}
            >
              {`+ ${formatEuro(Math.floor(Math.random() * 10000), true)}`}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-green-50/20 to-transparent"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}
