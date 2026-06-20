import { Quote, UserRound } from 'lucide-react'
import { Img } from './Img'
import { Newsletter } from './Newsletter'
import { PageBanner } from './PageBanner'
import { SectionTitle } from './SectionTitle'
import { ServicesSection } from './ServicesSection'

const founders = [
  {
    name: 'Aditsorn Gulikhandan Firdous Khan',
    role: 'Co-founder — Legal & Business Development',
    image: '/images/about/firdous.jpeg',
    imagePosition: 'object-[center_20%]',
    quote: 'Our vision is to create a global network where quality Thai vehicles reach customers worldwide. We believe in transparency, trust, and delivering beyond expectations.',
  },
  {
    name: 'Hamza Mohammad Yoshioka',
    role: 'Co-founder — Marketing, Sales & Shipping',
    image: '/images/about/hamza.jpeg',
    imagePosition: 'object-[center_32%]',
    quote: 'Efficiency and customer satisfaction are at the core of our operations. We’ve built processes that ensure every transaction is smooth and every client is happy.',
  },
  {
    name: 'Rameez Zubair',
    role: 'Co-founder — Operations, Sales & Modifications',
    image: '/images/about/Rameez.jpeg',
    imagePosition: 'object-[center_24%]',
    quote: 'Technology drives our business forward. We leverage cutting-edge solutions to streamline operations and enhance the customer experience at every touchpoint.',
  },
  {
    name: 'Behlum Mohammad Nadeem',
    role: 'Co-founder — Marketing, Operations & Sales',
    image: '/images/about/Nadeem.jpeg',
    imagePosition: 'object-[center_22%]',
    quote: 'Financial integrity is the foundation of our business. We ensure transparent transactions and sustainable growth while delivering value to our customers and partners.',
  },
]

const staff = [
  {
    name: 'Shoaib Khokhar',
    role: 'Accounts Manager',
    description: 'With over 8 years of experience in accounts and field operations, Shoaib ensures seamless financial management and client satisfaction.',
  },
  {
    name: 'Bibiasmina Arabshah',
    role: 'Accounts Specialist',
    description: 'Bibiasmina manages financial operations with precision, ensuring transparency and smooth transactions for every client.',
  },
  {
    name: 'Basri',
    role: 'Vehicle Modification Specialist',
    description: 'Basri is a skilled vehicle modification specialist who transforms ordinary cars into customized, high-performance machines.',
  },
]

export function AboutPageContent() {
  return <>
    <PageBanner title="About Us" subtitle="Connecting Thailand with the world through quality vehicles" />

    <section className="section-pad bg-white">
      <div className="container-site mx-auto max-w-5xl text-center">
        <SectionTitle eyebrow="Who We Are" center>Our Mission</SectionTitle>
        <span className="mx-auto mt-6 block h-1 w-16 bg-[#D71920]" aria-hidden="true" />
        <p className="mx-auto mt-7 max-w-4xl text-lg leading-9 text-[#5f5f5f]">
          Our mission is to connect Thailand with the world by delivering high-quality used and new vehicles. We are committed to building lasting partnerships, ensuring seamless global trade, and representing the excellence of Thai vehicles with integrity, efficiency, and trust.
        </p>
      </div>
    </section>

    <section className="section-pad bg-[#F7F7F7]">
      <div className="container-site">
        <SectionTitle eyebrow="Leadership" center>Co-founders</SectionTitle>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-[#666]">Meet the leadership team building trusted automotive connections between Thailand and the world.</p>
        <div className="mx-auto mt-12 grid max-w-7xl gap-7 lg:grid-cols-2">
          {founders.map((founder, index) => (
            <article key={founder.name} className="group grid overflow-hidden rounded-2xl border border-black/[.07] bg-white shadow-[0_12px_35px_rgba(0,0,0,.06)] transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_22px_48px_rgba(0,0,0,.11)] sm:min-h-[390px] sm:grid-cols-[minmax(190px,42%)_1fr]">
              <div className="relative h-72 overflow-hidden bg-[#e8e8e8] min-[430px]:h-80 sm:h-full">
                <Img src={founder.image} alt={founder.name} className={`h-full w-full object-cover ${founder.imagePosition} transition duration-500 group-hover:scale-[1.025]`} />
                <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent sm:hidden" aria-hidden="true" />
                <span className="absolute left-5 top-5 grid h-9 min-w-9 place-items-center rounded-full bg-[#D71920] px-2 text-xs font-bold text-white shadow-lg" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative flex min-w-0 flex-col p-5 min-[430px]:p-7 sm:p-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#999]">Leadership Team</p>
                  <h3 className="mt-3 text-2xl font-semibold uppercase leading-snug text-[#111]">{founder.name}</h3>
                  <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[.08em] text-[#D71920]">{founder.role}</p>
                </div>
                <span className="my-6 h-px w-full bg-[#e7e7e7]" aria-hidden="true" />
                <div className="relative flex flex-1 items-center">
                  <Quote className="absolute -left-1 -top-2 text-[#D71920]/10" size={54} fill="currentColor" aria-hidden="true" />
                  <blockquote className="relative text-[15px] leading-7 text-[#5e5e5e]">“{founder.quote}”</blockquote>
                </div>
                <span className="mt-7 h-1 w-12 bg-[#D71920]" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-white">
      <div className="container-site">
        <SectionTitle eyebrow="Our People" center>Our Staff</SectionTitle>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-[#666]">Experienced specialists supporting our clients, finances and vehicle transformations.</p>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {staff.map(member => (
            <article key={member.name} className="relative overflow-hidden rounded-xl border border-[#e5e5e5] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,.05)]">
              <span className="grid h-16 w-16 place-items-center rounded-xl bg-red-50 text-[#D71920] ring-1 ring-red-100">
                <UserRound size={30} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold uppercase">{member.name}</h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-[#D71920]">{member.role}</p>
              <p className="mt-5 leading-7 text-[#666]">{member.description}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-[#D71920]" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#080808] py-20 text-white sm:py-24">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-[#D71920]/10" aria-hidden="true" />
      <div className="container-site relative max-w-5xl text-center">
        <SectionTitle eyebrow="Our Commitment" center light>More Than A Vehicle Transaction</SectionTitle>
        <div className="mx-auto mt-8 max-w-4xl space-y-5 text-base leading-8 text-white/70 sm:text-lg">
          <p>At Adami Motors, we go beyond simply buying and selling vehicles. We create lasting relationships with our clients, providing comprehensive automotive solutions that meet diverse needs and exceed expectations.</p>
          <p>Whether you’re looking to purchase your dream car, sell your vehicle, or enhance it with custom modifications, we’ve got you covered with our expertise, quality service, and dedication to excellence.</p>
        </div>
      </div>
    </section>

    <ServicesSection
      eyebrow="Complete Automotive Care"
      title="Our Services"
      description="Comprehensive automotive solutions tailored to your needs."
    />
    <Newsletter />
  </>
}
