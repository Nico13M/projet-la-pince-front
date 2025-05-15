import Image from 'next/image'

const TestimonialCard = ({
  testimonial,
  name,
  role,
  image,
  className = '',
}: {
  testimonial: string
  name: string
  role: string
  image: string
  className?: string
}) => {
  return (
    <div
      className={`rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-700 hover:bg-white/20 ${className}`}
    >
      <p className="leading-relaxed text-white italic">"{testimonial}"</p>
      <div className="mt-6 flex items-center">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-white">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
