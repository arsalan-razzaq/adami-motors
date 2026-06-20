import { useState } from 'react'
import { Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = event => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email.')
      return
    }
    setMessage('Thanks — you are on the list!')
    setEmail('')
  }

  return (
    <section className="bg-[#D71920] py-8 text-white">
      <form onSubmit={submit} className="container-site flex flex-col items-center gap-5 lg:flex-row">
        <Mail size={36} />
        <div className="mr-auto"><h2 className="text-2xl uppercase">Subscribe to Our Newsletter</h2><p className="text-sm text-white/75">New arrivals, services and export updates from Bangkok.</p></div>
        <div className="w-full max-w-xl"><div className="flex"><input value={email} onChange={event => setEmail(event.target.value)} className="min-w-0 flex-1 rounded-l-md bg-white px-4 text-black" placeholder="Your email address" aria-label="Email address" /><button className="rounded-r-md bg-black px-6 py-3 font-bold uppercase">Subscribe</button></div>{message && <p className="mt-1 text-xs">{message}</p>}</div>
      </form>
    </section>
  )
}
