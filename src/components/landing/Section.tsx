import React from 'react'

const Section = ({
  children,
  className = '',
  bgColor = 'bg-background',
  id,
}: {
  children: React.ReactNode
  className?: string
  bgColor?: string
  id?: string
}) => {
  return (
    <section id={id} className={`${bgColor} py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}

export default Section
