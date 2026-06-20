const fallbackImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80'

export function Img({ src, alt, className = '' }) {
  return <img src={src} alt={alt} className={className} onError={event => { event.currentTarget.src = fallbackImage }} />
}
