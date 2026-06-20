import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data'
import { iconMap } from './iconMap'
import { SectionTitle } from './SectionTitle'

export function ServicesSection({
  eyebrow = 'Complete Vehicle Care',
  title = 'Our Automotive Services',
  description = 'Complete automotive support—from finding the right vehicle to customization, maintenance and worldwide delivery.',
}) {
  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <SectionTitle eyebrow={eyebrow}>{title}</SectionTitle>
        <p className="mt-5 max-w-2xl leading-7 text-[#666]">
          {description}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([icon, title, description], index) => {
            const Icon = iconMap[icon]

            return (
              <article key={title} className="card-hover group relative flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,.04)] sm:p-8">
                <span className="absolute right-6 top-4 font-display text-6xl font-bold text-[#f1f1f1] transition-colors group-hover:text-red-50" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative grid h-14 w-14 place-items-center rounded-xl bg-red-50 text-[#D71920] ring-1 ring-red-100">
                  <Icon size={28} strokeWidth={2} />
                </span>
                <h3 className="relative mt-7 text-xl font-semibold uppercase leading-snug">{title}</h3>
                <p className="relative mt-3 leading-7 text-[#666]">{description}</p>
                <Link to="/services" className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#D71920]">
                  Learn More <ArrowRight size={17} />
                </Link>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#D71920] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
