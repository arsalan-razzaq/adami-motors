import { BadgeCheck, Globe2, Headphones, ShieldCheck, UsersRound, Wrench } from 'lucide-react'
import { SectionTitle } from './SectionTitle'

const reasons = [
  { title: 'Quality Guarantee', description: 'Carefully selected vehicles and dependable workmanship.', Icon: ShieldCheck },
  { title: 'Global Shipping', description: 'Coordinated export support from Thailand to destinations worldwide.', Icon: Globe2 },
  { title: '24/7 Support', description: 'Responsive guidance before, during and after your purchase.', Icon: Headphones },
  { title: 'Trusted Automotive Partner', description: 'Transparent communication and long-term client relationships.', Icon: BadgeCheck },
  { title: 'Experienced Team', description: 'Practical expertise across sales, sourcing and vehicle care.', Icon: UsersRound },
  { title: 'Modern Equipment', description: 'Professional tools for accurate inspection, service and upgrades.', Icon: Wrench },
]

export function WhySection() {
  return (
    <section className="section-pad bg-[#F3F3F3]">
      <div className="container-site">
        <SectionTitle eyebrow="Why Adami Motors">A Partner You Can Rely On</SectionTitle>
        <p className="mt-5 max-w-2xl leading-7 text-[#666]">
          Reliable automotive expertise, clear communication and complete support at every stage.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ title, description, Icon }) => (
            <article key={title} className="group flex min-h-[150px] items-start gap-5 rounded-xl border border-black/5 bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(0,0,0,.09)]">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-50 text-[#D71920] ring-1 ring-red-100 transition-colors group-hover:bg-[#D71920] group-hover:text-white">
                <Icon size={26} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-lg font-semibold uppercase leading-snug">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#666]">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
