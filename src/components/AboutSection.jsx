import { Button } from './Button'
import { Img } from './Img'
import { SectionTitle } from './SectionTitle'

const aboutServices = [
  {
    title: 'Vehicle Sales & Procurement',
    description: 'Buy, sell, or source high-quality cars, including specialized Thai vehicles.',
  },
  {
    title: 'Custom Modifications',
    description: 'Upgrade your ride with performance and aesthetic enhancements.',
  },
  {
    title: 'Accessories Installation',
    description: 'From essential add-ons to premium upgrades, we install it all.',
  },
  {
    title: 'Maintenance & Repairs',
    description: 'Expert electrical and mechanical services to keep your vehicle running smoothly.',
  },
  {
    title: 'Customer Care & Swift Delivery',
    description: 'Dedicated support and on-time delivery, ensuring a hassle-free experience.',
  },
]

export function AboutSection() {
  return (
    <section className="section-pad">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <Img
            src="https://images.unsplash.com/photo-1562141961-b5d5f2b24142?auto=format&fit=crop&w=1200&q=85"
            alt="Adami Motors vehicle showroom"
            className="h-[520px] w-full rounded-xl object-cover"
          />
          <div className="absolute bottom-5 right-5 rounded-lg bg-[#D71920] p-6 text-white">
            <b className="block text-4xl font-display">15</b>
            Years Experience
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="About Us">Adami Motors Is The Best Place For Your Auto Purchase</SectionTitle>
          <p className="mt-6 leading-8 text-[#666]">
            At Adami, we go beyond car buying and selling. Whether you’re looking to purchase your dream car, sell your vehicle, or enhance it with custom modifications, we’ve got you covered.
          </p>

          <div className="mt-7 space-y-3">
            {aboutServices.map((service, index) => (
              <div key={service.title} className="flex items-start gap-4 border-b pb-3">
                <b className="shrink-0 font-display text-2xl text-[#D71920]">
                  {String(index + 1).padStart(2, '0')}
                </b>
                <div>
                  <h3 className="font-sans font-semibold">{service.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#666]">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button to="/about" className="mt-8">Learn More About Us</Button>
        </div>
      </div>
    </section>
  )
}
