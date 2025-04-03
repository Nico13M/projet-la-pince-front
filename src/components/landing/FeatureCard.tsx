import { BarChart3, PieChart, Wallet } from 'lucide-react'
import React from 'react'

const iconMap: Record<string, React.ReactNode> = {
  Wallet: <Wallet className="text-primary h-7 w-7" />,
  BarChart3: <BarChart3 className="text-primary h-7 w-7" />,
  PieChart: <PieChart className="text-primary h-7 w-7" />,
}

const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
}: {
  icon: string
  title: string
  description: string
  className?: string
}) => {
  return (
    <div
      className={`rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
        {iconMap[icon]}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-3">{description}</p>
    </div>
  )
}

export default FeatureCard
