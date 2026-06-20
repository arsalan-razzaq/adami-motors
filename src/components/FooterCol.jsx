import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FooterCol({ title, items }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold text-white">{title}</h3>
      <ul className="space-y-3.5 text-sm leading-6 text-white/80">
        {items.map(item => {
          const [to, label] = Array.isArray(item) ? item : [null, item]
          const content = <><ChevronRight className="mt-1 shrink-0 text-[#D71920]" size={16} strokeWidth={3} /><span>{label}</span></>

          return (
            <li key={`${to || 'text'}-${label}`}>
              {to
                ? <Link className="flex gap-2 transition-colors hover:text-white" to={to}>{content}</Link>
                : <span className="flex gap-2">{content}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
