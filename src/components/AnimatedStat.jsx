import { useEffect, useState } from 'react'

export function AnimatedStat({ target, label, Icon, start }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }

    const duration = 1500
    const startTime = performance.now()
    let frameId

    const update = currentTime => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * easedProgress))

      if (progress < 1) frameId = requestAnimationFrame(update)
    }

    frameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameId)
  }, [start, target])

  return (
    <div className="border-l-2 border-[#D71920] pl-6">
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-[#D71920]/15 text-[#ff343b]" aria-hidden="true">
        <Icon size={24} strokeWidth={2.2} />
      </span>
      <b className="block text-5xl font-display tabular-nums">{value.toLocaleString('en-US')}</b>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/55">{label}</p>
    </div>
  )
}
