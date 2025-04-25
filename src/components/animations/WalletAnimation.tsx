'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet } from 'lucide-react'

export default function BudgetWalletAnimation() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1200) // Durée réduite
    }, 3000) // Intervalle plus court
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-48 w-48 mx-auto my-8 group">
      {/* Portefeuille */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            y: isActive ? -8 : 0,
            scale: isActive ? 1.03 : 1
          }}
          transition={{ 
            type: 'spring',
            stiffness: 260,
            damping: 15
          }}
        >
          <Wallet className="w-32 h-32 text-primary/90 stroke-[1.3]" />
          
          {/* Barre de progression */}
          <motion.div
            className="absolute top-4 left-4 right-4 h-1 bg-green-100 rounded-full"
            animate={{ 
              width: isActive ? ['40%', '85%'] : '40%',
              opacity: isActive ? [0.8, 0.4] : 0 
            }}
            transition={{ duration: 0.8 }} // Animation plus rapide
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isActive && (
          <>
            {/* Flux monétaire - apparition plus précoce */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-8 w-8 bg-green-50 rounded-lg border border-green-200"
                initial={{ 
                  opacity: 0,
                  x: -60 + i * 60,
                  y: -40,
                  scale: 0.7,
                  rotate: -15 + i * 15
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: 80,
                  scale: [0.7, 1.1, 0.9],
                  x: '50%'
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.0, // Durée réduite
                  delay: i * 0.05, // Délai réduit
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-green-600 font-medium">
                  €
                </div>
              </motion.div>
            ))}

            {/* Compteur numérique positionné plus haut */}
            <motion.div
              className="absolute left-1/2 top-[15%] -translate-x-1/2 text-xl font-semibold text-green-700"
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: -20, // Déplacement vers le haut
                scale: [0.9, 1.1, 1] 
              }}
              transition={{ 
                duration: 1.2,
                delay: 0.2 // Apparition plus précoce
              }}
            >
              +2,345€
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fond animé */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-green-50/20 to-transparent rounded-2xl"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }} // Transition plus rapide
      />
    </div>
  )
}