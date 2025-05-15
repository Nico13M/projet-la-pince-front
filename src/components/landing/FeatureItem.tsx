import { Check } from 'lucide-react'

const FeatureItem = ({
  title,
  description,
  items,
  className = '',
}: {
  title: string
  description: string
  items: string[]
  className?: string
}) => {
  return (
    <div className={className}>
      <h3 className="text-primary mb-4 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flex items-start">
            <span className="bg-primary/10 mt-1 mr-3 rounded-full p-1">
              <Check className="text-primary h-4 w-4" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureItem
