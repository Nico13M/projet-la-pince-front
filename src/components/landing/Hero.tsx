'use client'

import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'
import { ArrowRight, CreditCard, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FeaturePreview from '../../../public/hero-preview.webp'
const Hero = () => {
  const { isVisible, visibilityClasses } = useVisibilityAnimation()
  return (
    <section className="from-primary to-secondary relative overflow-hidden bg-gradient-to-br text-white">
      <div
        className={`relative z-10 mx-auto max-w-7xl px-6 py-24 transition-all duration-1000 md:py-32 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className={`max-w-2xl ${visibilityClasses()}`}>
            <h1 className="text-5xl leading-tight font-extrabold tracking-tight md:text-6xl">
              Simplifiez vos finances personnelles
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed font-light">
              Une solution élégante pour gérer vos budgets, suivre vos dépenses
              et atteindre vos objectifs financiers en toute sérénité.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="group text-primary hover:bg-opacity-90 flex items-center justify-center rounded-full bg-white px-8 py-4 font-medium transition-all hover:scale-105 hover:shadow-lg"
              >
                <span>Démarrer gratuitement</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#features"
                className="hover:bg-opacity-10 flex items-center justify-center !font-bold rounded-full border border-white bg-transparent px-8 py-4 transition-all hover:bg-white hover:text-black"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          <div
            className={`relative hidden h-[500px] w-full max-w-md md:block ${visibilityClasses(300)}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float relative h-[560px] w-[560px] overflow-hidden rounded-[40px] border-8 border-white/20 shadow-2xl">
                <Image
                  src={FeaturePreview}
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
                Optimisez vos finances !
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-secondary bg-opacity-20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-primary bg-opacity-20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}

export default Hero
