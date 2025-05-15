import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PricingCard = ({
  title,
  price,
  features,
  buttonText,
  buttonLink,
  isPremium = false,
  isPopular = false,
  className = '',
}: {
  title: string
  price?: string
  features: string[]
  buttonText: string
  buttonLink: string
  isPremium?: boolean
  isPopular?: boolean
  className?: string
}) => {
  return (
    <div
      className={`rounded-2xl p-8 text-left shadow-lg transition-all hover:-translate-y-1 ${
        isPremium
          ? 'bg-primary border-2 border-white/20 text-white shadow-2xl'
          : 'border-primary/20 border bg-white'
      } ${className}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <h3
          className={`text-lg font-bold ${isPremium ? 'text-white shadow-[0_0_0.5px_rgba(0,0,0,0.5)]' : 'text-primary'}`}
        >
          {title}
        </h3>
        {isPopular && (
          <span className="text-primary rounded-full bg-white px-2 py-1 text-xs font-bold">
            POPULAIRE
          </span>
        )}
      </div>
      {price && (
        <p className="mb-4">
          <span className="text-3xl font-bold">{price.split('/')[0]}</span>
          <span
            className={
              isPremium
                ? 'text-white shadow-[0_0_0.5px_rgba(0,0,0,0.4)]'
                : 'text-muted-foreground'
            }
          >
            /{price.split('/')[1]}
          </span>
        </p>
      )}
      <ul className="mb-6 space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span
              className={`mr-2 ${isPremium ? 'text-white shadow-[0_0_0.5px_rgba(0,0,0,0.4)]' : 'text-primary'}`}
            >
              ✓
            </span>
            <span
              className={
                isPremium
                  ? 'text-white shadow-[0_0_0.5px_rgba(0,0,0,0.4)]'
                  : 'text-muted-foreground'
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className={`group flex w-full items-center justify-center rounded-lg px-6 py-3 font-medium transition-all ${
          isPremium
            ? 'text-primary hover:bg-secondary-foreground border-primary/10 border bg-white'
            : 'bg-primary hover:bg-primary/90 border border-transparent text-white'
        }`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export default PricingCard
