import { CarFront, ClipboardCheck, PackageCheck, Ship } from 'lucide-react'
import { SectionTitle } from './SectionTitle'

const shippingSteps = [
  { title: 'Choose Your Vehicle', description: 'Browse our inventory or tell us the exact vehicle you need.', Icon: CarFront },
  { title: 'Confirm Vehicle Details', description: 'Review specifications, condition, pricing and export documents.', Icon: ClipboardCheck },
  { title: 'Arrange Shipping', description: 'We coordinate secure transport, customs and port handling.', Icon: Ship },
  { title: 'Receive Your Vehicle', description: 'Track delivery and receive your vehicle at your selected destination.', Icon: PackageCheck },
]

export function ShippingSection() {
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-site">
        <SectionTitle eyebrow="Worldwide Export">Global Shipping Process</SectionTitle>
        <p className="mt-5 max-w-2xl leading-7 text-[#666]">
          A clear, professionally managed process from vehicle selection to final international delivery.
        </p>

        <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-[#dedede] lg:block" aria-hidden="true" />
          {shippingSteps.map(({ title, description, Icon }, index) => (
            <article key={title} className="relative text-center">
              <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-[#D71920] text-white shadow-[0_8px_22px_rgba(215,25,32,.25)]">
                <Icon size={30} strokeWidth={1.9} />
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-[#080808] text-xs font-bold ring-4 ring-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase">{title}</h3>
              <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-[#666]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
