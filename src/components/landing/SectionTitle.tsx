const SectionTitle = ({
  title,
  subtitle,
  className = '',
  light = false,
}: {
  title: string
  subtitle?: string
  className?: string
  light?: boolean
}) => {
  return (
    <div className={`mb-16 text-center ${className}`}>
      <h2
        className={`text-3xl font-bold md:text-4xl ${light ? 'text-white' : 'text-primary'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg ${light ? 'text-white/80' : 'text-muted-foreground'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
