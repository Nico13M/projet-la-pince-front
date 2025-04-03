const StatItem = ({
  number,
  label,
  className = '',
}: {
  number: string
  label: string
  className?: string
}) => {
  return (
    <div className={`text-center transition-all duration-700 ${className}`}>
      <p className="text-4xl font-bold md:text-5xl">{number}</p>
      <p className="mt-2 text-white/80">{label}</p>
    </div>
  )
}

export default StatItem
