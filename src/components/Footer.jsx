import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { contact } from '../data'
import { FooterCol } from './FooterCol'

const specializations = [
  'Modification of Vehicles',
  'Accessories Installation',
  'Vehicle Maintenance',
  'Electrical & Mechanical Repair',
  'Sourcing & Procurement of Thai Vehicles',
  'Customer Service',
  'Swift Delivery of Vehicles',
]

const ourWork = [
  'Specialize in Thai Vehicles',
  'Also Specialized in World-Famous Vehicle Brands',
  'Export Luxury & Commercial Thai Vehicles Worldwide',
  'Deal in Brand New & Used Vehicles',
  'Vehicle Customization',
  'Configure as per Customer Needs',
]

const socialIcons = [
  ['Twitter', Twitter],
  ['Facebook', Facebook],
  ['YouTube', Youtube],
  ['LinkedIn', Linkedin],
]

export function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden text-white/70">
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.05fr_.8fr_1.1fr_1.1fr] xl:gap-14">
        <div>
          <h3 className="mb-6 text-2xl font-semibold text-white">Address</h3>
          <div className="space-y-4 text-sm leading-7 text-white/80">
            <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#D71920]" size={19} />{contact.address}</p>
            <a className="flex items-center gap-3 transition-colors hover:text-white" href={`tel:${contact.phone}`}><Phone className="shrink-0 text-[#D71920]" size={19} />{contact.phone}</a>
            <a className="flex items-center gap-3 break-all transition-colors hover:text-white" href={`mailto:${contact.email}`}><Mail className="shrink-0 text-[#D71920]" size={19} />{contact.email}</a>
          </div>
          <div className="mt-7 flex gap-3" aria-label="Social media">
            {socialIcons.map(([label, Icon]) => (
              <span key={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white" role="img" aria-label={label}>
                <Icon size={18} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-2xl font-semibold text-white">Opening Hours</h3>
          <div className="space-y-7 text-sm leading-7 text-white/80">
            <p><b className="block text-white">Monday – Friday</b>{contact.weekday}</p>
            <p><b className="block text-white">Saturday – Sunday</b>{contact.weekend}</p>
          </div>
        </div>

        <FooterCol title="What We Specialize In" items={specializations} />
        <FooterCol title="Our Work" items={ourWork} />
      </div>

      <div className="relative border-t border-white/10 py-6">
        <div className="container-site flex flex-col justify-between gap-3 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Adami Motors. All rights reserved.</p>
          <p>Privacy Policy · Terms & Conditions</p>
        </div>
      </div>
    </footer>
  )
}
