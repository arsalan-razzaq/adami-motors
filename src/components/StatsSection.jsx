import { useEffect, useRef, useState } from 'react'
import { CarFront, Check, Settings, UsersRound } from 'lucide-react'
import { AnimatedStat } from './AnimatedStat'

const stats = [
  { target: 1000, label: 'Cars Sold', Icon: Check },
  { target: 300, label: 'Cars Modified', Icon: Settings },
  { target: 700, label: 'Satisfied Clients', Icon: UsersRound },
  { target: 15, label: 'Years of Experience', Icon: CarFront },
]

export function StatsSection() {
  const sectionRef = useRef(null)
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#080808] py-16 text-white" aria-label="Adami Motors achievements">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map(stat => <AnimatedStat key={stat.label} {...stat} start={startCount} />)}
      </div>
    </section>
  )
}
