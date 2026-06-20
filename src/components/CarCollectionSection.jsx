import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Img } from './Img'
import { SectionTitle } from './SectionTitle'

const brands = [
  {
    name: 'Honda',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85',
    description: 'Honda blends efficiency with intelligent design, offering innovative and dependable vehicles for everyday driving.',
  },
  {
    name: 'Tesla',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=85',
    description: 'Tesla leads electric mobility with futuristic design, advanced technology and a refined driving experience.',
  },
  {
    name: 'Ford',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85',
    description: 'Ford stands for strength and dependability, from capable everyday vehicles to powerful pickup trucks.',
  },
  {
    name: 'Chevrolet',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85',
    description: 'Chevrolet combines bold styling with performance across iconic cars, practical SUVs and capable trucks.',
  },
  {
    name: 'Audi',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=85',
    description: 'Audi delivers luxury, comfort and progressive technology with precise engineering and confident performance.',
  },
  {
    name: 'BMW',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85',
    description: 'BMW brings together premium craftsmanship, innovation and the engaging performance of a true driver’s car.',
  },
  {
    name: 'Mercedes-Benz',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85',
    description: 'Mercedes-Benz defines timeless luxury through advanced safety, elegant design and exceptional comfort.',
  },
  {
    name: 'Toyota',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85',
    description: 'Toyota is trusted worldwide for reliable, practical and durable vehicles built for long-lasting journeys.',
  },
]

function getPageSize() {
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 4
}

export function CarCollectionSection() {
  const [pageSize, setPageSize] = useState(getPageSize)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const pageCount = Math.ceil(brands.length / pageSize)

  const visibleBrands = useMemo(() => {
    const start = page * pageSize
    return brands.slice(start, start + pageSize)
  }, [page, pageSize])

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize())
      setPage(0)
    }

    addEventListener('resize', handleResize)
    return () => removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = setInterval(() => {
      setPage(current => (current + 1) % pageCount)
    }, 4200)

    return () => clearInterval(intervalId)
  }, [pageCount, paused])

  const showPrevious = () => setPage(current => (current - 1 + pageCount) % pageCount)
  const showNext = () => setPage(current => (current + 1) % pageCount)

  return (
    <section className="section-pad overflow-hidden bg-[#F7F7F7]">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionTitle eyebrow="Top Brands">Our Car Collection</SectionTitle>
            <p className="mt-4 max-w-2xl leading-7 text-[#666]">
              Explore a curated selection of trusted global brands, sourced and supported by our automotive team in Thailand.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button type="button" onClick={showPrevious} className="grid h-12 w-12 place-items-center rounded-full border border-[#d8d8d8] bg-white transition hover:border-[#D71920] hover:bg-[#D71920] hover:text-white" aria-label="Show previous car brands">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={showNext} className="grid h-12 w-12 place-items-center rounded-full bg-[#D71920] text-white shadow-lg shadow-red-950/15 transition hover:bg-[#B51017]" aria-label="Show next car brands">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div key={`${page}-${pageSize}`} className={`collection-slide grid gap-6 ${pageSize === 1 ? 'grid-cols-1' : pageSize === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {visibleBrands.map(brand => (
              <article key={brand.name} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_12px_35px_rgba(0,0,0,.07)]">
                <Link to={`/vehicles?maker=${encodeURIComponent(brand.name)}`} className="relative block aspect-[4/3] overflow-hidden bg-[#e9e9e9]">
                  <Img src={brand.image} alt={`${brand.name} vehicle`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[.18em] text-white">Explore Brand</span>
                </Link>
                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="text-2xl font-semibold uppercase">{brand.name}</h3>
                  <span className="mx-auto mt-3 h-0.5 w-10 bg-[#D71920]" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-6 text-[#666]">{brand.description}</p>
                  <Link to={`/vehicles?maker=${encodeURIComponent(brand.name)}`} className="mt-auto inline-flex items-center justify-center gap-2 pt-5 text-xs font-bold uppercase tracking-wide transition-colors hover:text-[#D71920]">
                    View Vehicles <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2" aria-label="Car collection slides">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={`h-2.5 rounded-full transition-all ${page === index ? 'w-8 bg-[#D71920]' : 'w-2.5 bg-[#c9c9c9] hover:bg-[#888]'}`}
                aria-label={`Show collection slide ${index + 1}`}
                aria-current={page === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
