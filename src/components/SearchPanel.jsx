import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { makers, types, vehicles } from '../data'

export function SearchPanel({ compact = false }) {
  const navigate = useNavigate()
  const [more, setMore] = useState(false)
  const [filters, setFilters] = useState({})
  const set = (key, value) => setFilters(current => ({ ...current, [key]: value }))
  const submit = event => {
    event.preventDefault()
    const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value))
    navigate(`/vehicles?${query}`)
  }
  const models = [...new Set(vehicles.filter(vehicle => !filters.maker || vehicle.maker === filters.maker).map(vehicle => vehicle.model))].sort()
  const fields = [['maker', 'Maker', makers], ['model', 'Model', models], ['type', 'Vehicle Type', types], ['minYear', 'Minimum Year', [2010, 2015, 2018, 2019, 2020, 2022, 2024]], ['maxYear', 'Maximum Year', [2018, 2019, 2020, 2022, 2024, 2025, 2026]], ['minPrice', 'Minimum Price', [10000, 15000, 20000, 30000]], ['maxPrice', 'Maximum Price', [20000, 30000, 50000, 70000]]]

  return <form onSubmit={submit} className={`glass relative z-20 rounded-xl p-5 ${compact ? '' : 'container-site -mt-14'} `}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-9">{fields.map(([key, label, options]) => <label key={key} className="text-xs font-bold uppercase text-[#666]">{label}<select value={filters[key] || ''} onChange={event => set(key, event.target.value)} className="mt-2 h-12 w-full rounded border border-[#E4E4E4] bg-white px-3 text-sm font-normal normal-case"><option value="">Any</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>)}<button className="mt-auto flex h-12 items-center justify-center gap-2 rounded bg-[#D71920] px-4 font-bold uppercase text-white"><Search size={18} />Search</button><button type="button" onClick={() => setFilters({})} className="mt-auto h-12 rounded border font-bold uppercase">Reset</button></div>{more && <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-6">{[['engine', 'Engine', ['2.0L', '2.4L', '2.8L']], ['transmission', 'Transmission', ['Manual', 'Automatic']], ['fuelType', 'Fuel Type', ['Petrol', 'Diesel']], ['color', 'Color', ['White', 'Black', 'Silver', 'Grey', 'Red']], ['country', 'Available Country', ['Thailand']], ['steering', 'Steering Side', ['Left', 'Right']]].map(([key, label, options]) => <label key={key} className="text-xs font-bold uppercase">{label}<select value={filters[key] || ''} onChange={event => set(key, event.target.value)} className="mt-2 h-11 w-full rounded border px-2"><option value="">Any</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>)}</div>}<button type="button" onClick={() => setMore(!more)} className="mt-4 flex items-center gap-2 text-xs font-bold uppercase text-[#D71920]"><SlidersHorizontal size={15} />{more ? 'Fewer Options' : 'More Options'}</button></form>
}
