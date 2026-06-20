import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const vehiclesPath = resolve(projectRoot, 'src/data/vehicles.js')
const imagesRoot = resolve(projectRoot, 'public/images/vehicles')
const placeholder = '/images/vehicles/vehicle-placeholder.svg'
const concurrency = 4

const sleep = milliseconds => new Promise(resolvePromise => setTimeout(resolvePromise, milliseconds))

async function fetchWithRetry(url, attempts = 4) {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 AdamiMotorsImageSync/1.0' },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response
    } catch (error) {
      lastError = error
      if (attempt < attempts) await sleep(attempt * 500)
    }
  }

  throw lastError
}

function extractGalleryUrls(html, detailUrl) {
  const matches = [...html.matchAll(/<img\b[^>]*\bclass=["'][^"']*\bmain-car-img\b[^"']*["'][^>]*\bsrc=["']([^"']+)["']|<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*\bclass=["'][^"']*\bmain-car-img\b[^"']*["']/gi)]
  const urls = matches.map(match => new URL((match[1] || match[2]).trim(), detailUrl).href)
  return [...new Set(urls)]
}

function extensionFor(url, contentType) {
  const pathnameExtension = extname(new URL(url).pathname).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(pathnameExtension)) return pathnameExtension
  if (contentType?.includes('png')) return '.png'
  if (contentType?.includes('webp')) return '.webp'
  if (contentType?.includes('gif')) return '.gif'
  return '.jpg'
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await worker(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

const source = await readFile(vehiclesPath, 'utf8')
const prefix = 'export const vehicles = '
const start = source.indexOf(prefix)
if (start === -1) throw new Error(`Could not find ${prefix.trim()} in ${vehiclesPath}`)

const banner = source.slice(0, start)
const vehicles = JSON.parse(source.slice(start + prefix.length).trim())
await mkdir(imagesRoot, { recursive: true })

let downloaded = 0
let failedVehicles = 0

await mapLimit(vehicles, concurrency, async (vehicle, vehicleIndex) => {
  try {
    const detailResponse = await fetchWithRetry(vehicle.detailUrl)
    const galleryUrls = extractGalleryUrls(await detailResponse.text(), vehicle.detailUrl)
    if (!galleryUrls.length) throw new Error('No main-car-img gallery images found')

    const vehicleDirectory = resolve(imagesRoot, vehicle.carId)
    await mkdir(vehicleDirectory, { recursive: true })

    vehicle.images = await mapLimit(galleryUrls, 2, async (imageUrl, imageIndex) => {
      const imageResponse = await fetchWithRetry(imageUrl)
      const extension = extensionFor(imageUrl, imageResponse.headers.get('content-type'))
      const filename = `${String(imageIndex + 1).padStart(2, '0')}${extension}`
      await writeFile(resolve(vehicleDirectory, filename), Buffer.from(await imageResponse.arrayBuffer()))
      downloaded += 1
      return `/images/vehicles/${vehicle.carId}/${filename}`
    })

    console.log(`[${vehicleIndex + 1}/${vehicles.length}] ${vehicle.carId}: ${vehicle.images.length} images`)
  } catch (error) {
    failedVehicles += 1
    vehicle.images = vehicle.images?.filter(image => image !== placeholder) || []
    if (!vehicle.images.length) vehicle.images = [placeholder]
    console.error(`[${vehicleIndex + 1}/${vehicles.length}] ${vehicle.carId}: ${error.message}`)
  }
})

await writeFile(vehiclesPath, `${banner}${prefix}${JSON.stringify(vehicles, null, 2)}\n`, 'utf8')

console.log(`Synced ${downloaded} images for ${vehicles.length - failedVehicles}/${vehicles.length} vehicles.`)
if (failedVehicles) {
  throw new Error(`${failedVehicles} vehicles could not be synced; placeholders were retained.`)
}
