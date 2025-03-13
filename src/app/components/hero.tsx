import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, CreditCard, TrendingUp } from 'lucide-react'
import Chat from '../../../public/chat.jpg'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="from-primary to-secondary relative overflow-hidden bg-gradient-to-br text-white">
      <div
        className={`relative z-10 mx-auto max-w-7xl px-6 py-24 transition-all duration-1000 md:py-32 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="max-w-2xl">
            <h1 className="text-5xl leading-tight font-extrabold tracking-tight md:text-6xl">
              <span className="block">
                Simplifiez vos finances personnelles
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed font-light">
              Une solution élégante pour gérer vos budgets, suivre vos dépenses
              et atteindre vos objectifs financiers en toute sérénité.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="/register"
                className="group text-primary hover:bg-opacity-90 flex items-center justify-center rounded-full bg-white px-8 py-4 font-medium transition-all hover:scale-105 hover:shadow-lg"
              >
                <span>Démarrer gratuitement</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="hover:bg-opacity-10 flex items-center justify-center rounded-full border border-white bg-transparent px-8 py-4 font-medium transition-all hover:bg-white hover:text-black"
              >
                En savoir plus
              </a>
            </div>
          </div>

          <div className="relative hidden h-[500px] w-full max-w-md md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float relative h-[560px] w-[560px] overflow-hidden rounded-[40px] border-8 border-white/20 shadow-2xl">
                <Image
                  src={Chat}
                  alt="Application mobile La Pince"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="animate-float-slow absolute top-20 -left-10 rounded-xl bg-white p-3 shadow-lg">
              <CreditCard className="text-primary h-8 w-8" />
            </div>
            <div className="animate-float-delay absolute -right-6 bottom-40 rounded-xl bg-white p-3 shadow-lg">
              <TrendingUp className="text-secondary h-8 w-8" />
            </div>
            <div className="animate-float-slow absolute top-40 -right-14 rounded-xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
              <p className="text-primary text-sm font-medium">
                +28% d'économies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-secondary bg-opacity-20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-primary bg-opacity-20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="particles-container absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animationName: 'floatParticle',
                animationDuration: `${Math.random() * 30 + 20}s`,
                animationDelay: `${Math.random() * 10}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                '--random-x': `${Math.random() * 200 - 100}px`,
                '--random-y': `${Math.random() * 200 - 100}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
