import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Fuel, Gauge, Heart } from 'lucide-react'
import { km, money } from '../data'
import { Img } from './Img'

export function VehicleCard({ v, list = false }) {
  const [fav, setFav] = useState(() => JSON.parse(localStorage.getItem('adami-favs') || '[]').includes(v.id))
  const toggle = () => {
    const favourites = JSON.parse(localStorage.getItem('adami-favs') || '[]')
    const next = fav ? favourites.filter(id => id !== v.id) : [...favourites, v.id]
    localStorage.setItem('adami-favs', JSON.stringify(next))
    setFav(!fav)
  }

  return <article className={`card-hover group overflow-hidden rounded-lg border border-[#E4E4E4] bg-white ${list ? 'md:flex' : ''} ${v.status === 'sold' ? 'opacity-75' : ''}`}>
    <div className={`relative overflow-hidden bg-[#f1f1f1] ${list ? 'md:w-2/5' : 'aspect-[4/2.7]'}`}><Img src={v.images[0]} alt={`${v.title} ${v.year}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase text-white ${v.status === 'available' ? 'bg-emerald-600' : v.status === 'discounted' ? 'bg-[#D71920]' : 'bg-black'}`}>{v.status}</span><button onClick={toggle} aria-label="Toggle favourite" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow"><Heart size={17} className={fav ? 'fill-[#D71920] text-[#D71920]' : ''} /></button></div>
    <div className="flex flex-1 flex-col p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#D71920]">{v.maker} · {v.type}</p><h3 className="mt-2 text-xl font-semibold uppercase">{v.model}</h3><div className="my-4 grid grid-cols-3 gap-2 border-y py-3 text-xs text-[#666]"><span className="flex items-center gap-1"><Calendar size={14} />{v.year}</span><span className="flex items-center gap-1"><Gauge size={14} />{km(v.mileage)}</span><span className="flex items-center gap-1"><Fuel size={14} />{v.fuelType}</span></div><div className="mt-auto flex items-center justify-between gap-3"><b className="text-xl text-[#D71920]">{money(v.price)}</b><Link className="inline-flex items-center gap-1 text-xs font-bold uppercase" to={`/vehicles/${v.slug}`}>View Details <ArrowRight size={15} /></Link></div></div>
  </article>
}
