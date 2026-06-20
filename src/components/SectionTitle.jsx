export function SectionTitle({ eyebrow, children, center = false, light = false }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : ''}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-[#D71920]">{eyebrow}</p>}
      <h2 className={`text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#101010]'}`}>{children}</h2>
    </div>
  )
}
