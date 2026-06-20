import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Clock3, Facebook, Instagram, Mail, MapPin, Menu, Phone, X, Youtube } from 'lucide-react'
import { contact, makers, types } from '../data'
import { Button } from './Button'
import { Footer } from './Footer'
import { MegaList } from './MegaList'
import { ScrollTop } from './ScrollTop'

export function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const handleScroll = () => setScrolled(scrollY > 20)
    addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    const handleEscape = event => event.key === 'Escape' && setOpen(false)
    addEventListener('keydown', handleEscape)
    return () => removeEventListener('keydown', handleEscape)
  }, [])

  const links = [['/', 'Home'], ['/vehicles', 'Vehicles'], ['/sell-your-car', 'Sell Your Car'], ['/services', 'Services'], ['/about', 'About Us'], ['/contact', 'Contact Us']]

  return <>
    <div className="bg-[#080808] text-[11px] text-white/80">
      <div className="container-site flex min-h-10 items-center justify-between gap-2 py-2 sm:gap-3 sm:py-0">
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden sm:inline">Follow Us</span><Facebook size={14} /><Instagram size={14} /><span className="font-bold">X</span><Youtube size={14} />
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <span className="hidden items-center gap-1 xl:flex"><MapPin size={13} /> Bangkok, Thailand</span>
          <span className="hidden items-center gap-1 sm:flex"><Clock3 size={13} /> <span className="hidden md:inline">Mon–Fri </span>09:00–21:00</span>
          <a className="flex min-w-0 items-center gap-1 whitespace-nowrap" href={`tel:${contact.phone}`}><Phone size={13} /><span className="hidden min-[480px]:inline">{contact.phone}</span></a>
          <a className="hidden items-center gap-1 lg:flex" href={`mailto:${contact.email}`}><Mail size={13} />{contact.email}</a>
        </div>
      </div>
    </div>

    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container-site flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3"><img src="/images/adami/adami-logo.jpg" alt="Adami Motors logo" className="h-14 w-auto object-contain" onError={event => { event.currentTarget.style.display = 'none' }} /><span className="sr-only">Adami Motors Thailand</span></Link>
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([to, label]) => label === 'Vehicles'
            ? <div key={to} className="group relative py-7">
                <NavLink to={to} className={({ isActive }) => `relative flex items-center gap-1 text-xs font-bold uppercase xl:text-sm ${isActive ? 'text-[#D71920] after:absolute after:-bottom-6 after:left-0 after:h-0.5 after:w-full after:bg-[#D71920]' : 'hover:text-[#D71920]'}`} aria-haspopup="true">{label}<ChevronDown size={15}/></NavLink>
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(760px,80vw)] -translate-x-1/2 rounded-b-xl border bg-white p-6 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid gap-8 md:grid-cols-2">
                    <MegaList title="Shop by Maker" items={makers} param="maker" />
                    <MegaList title="Shop by Type" items={types} param="type" />
                  </div>
                </div>
              </div>
            : <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `relative py-7 text-xs font-bold uppercase xl:text-sm ${isActive ? 'text-[#D71920] after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-full after:bg-[#D71920]' : 'hover:text-[#D71920]'}`}>{label}</NavLink>
          )}
          <Button to="/vehicles" className="min-h-11 px-4 xl:px-5">View Vehicles</Button>
        </nav>
        <button className="rounded p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto border-t bg-white p-4 shadow-2xl lg:hidden">
          <nav className="container-site flex flex-col">
            {links.map(([to, label]) => <NavLink key={to} to={to} className="border-b py-4 font-display text-lg font-semibold uppercase sm:text-xl">{label}</NavLink>)}
            <details className="border-b py-4"><summary className="font-bold uppercase">Shop by Maker</summary><div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">{makers.map(item => <Link key={item} to={`/vehicles?maker=${encodeURIComponent(item)}`}>{item}</Link>)}</div></details>
            <details className="border-b py-4"><summary className="font-bold uppercase">Shop by Type</summary><div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">{types.map(item => <Link key={item} to={`/vehicles?type=${encodeURIComponent(item)}`}>{item}</Link>)}</div></details>
            <div className="mt-5 rounded-lg bg-[#080808] p-4 text-sm text-white/75"><p className="font-bold text-white">Adami Motors Bangkok</p><p className="mt-2">{contact.phone}</p><p>{contact.weekday}</p></div>
          </nav>
        </div>
      )}
    </header>
    <main>{children}</main>
    <Footer />
    <ScrollTop />
  </>
}
