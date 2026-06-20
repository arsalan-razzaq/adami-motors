const fallbackImage = '/images/vehicles/vehicle-placeholder.svg'

export function Img({ src, alt, className = '' }) {
  return <img src={src} alt={alt} className={className} onError={event => { event.currentTarget.src = fallbackImage }} />
}
