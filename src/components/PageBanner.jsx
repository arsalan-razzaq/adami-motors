export function PageBanner({ title, subtitle }) {
  return (
    <section className="page-banner relative overflow-hidden py-14 text-white sm:py-20">
      <div className="container-site relative z-10">
        <p className="mb-3 text-sm text-white/65">Home / {title}</p>
        <h1 className="break-words text-3xl font-bold uppercase sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/75">{subtitle}</p>}
      </div>
    </section>
  )
}
