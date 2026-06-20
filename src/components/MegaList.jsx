import { Link } from 'react-router-dom'

export function MegaList({ title, items, param }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#D71920]">{title}</h3>
      <div className="grid max-h-[55vh] grid-cols-2 gap-x-4 gap-y-2 overflow-y-auto pr-2 text-sm">
        {items.map(item => (
          <Link key={item} className="rounded px-2 py-1 hover:bg-[#F7F7F7] hover:text-[#D71920]" to={`/vehicles?${param}=${encodeURIComponent(item)}`}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}
