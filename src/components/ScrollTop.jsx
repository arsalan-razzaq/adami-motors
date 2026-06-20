import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(scrollY > 500)
    addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <button onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#D71920] text-white shadow-xl" aria-label="Scroll to top">
      <ChevronUp />
    </button>
  )
}
