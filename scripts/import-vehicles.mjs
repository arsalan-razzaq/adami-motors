import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sourcePath = process.argv[2]
const outputPath = process.argv[3] || 'src/data/vehicles.js'

if (!sourcePath) {
  throw new Error('Usage: node scripts/import-vehicles.mjs <source.csv> [output.js]')
}

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        value += character
      }
    } else if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(value)
      value = ''
    } else if (character === '\n') {
      row.push(value.replace(/\r$/, ''))
      rows.push(row)
      row = []
      value = ''
    } else {
      value += character
    }
  }

  if (value || row.length) {
    row.push(value.replace(/\r$/, ''))
    rows.push(row)
  }

  const [headers, ...records] = rows
  return records
    .filter(record => record.some(field => field !== ''))
    .map(record => Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ''])))
}

const toNumber = value => Number(String(value).replaceAll(',', '').trim()) || 0
const source = readFileSync(resolve(sourcePath), 'utf8').replace(/^\uFEFF/, '')
const records = parseCsv(source)
const seenCarIds = new Set()
const resolvedOutputPath = resolve(outputPath)
let existingImagesByCarId = new Map()

if (existsSync(resolvedOutputPath)) {
  const existingSource = readFileSync(resolvedOutputPath, 'utf8')
  const exportPrefix = 'export const vehicles = '
  const exportStart = existingSource.indexOf(exportPrefix)

  if (exportStart !== -1) {
    const existingVehicles = JSON.parse(existingSource.slice(exportStart + exportPrefix.length).trim())
    existingImagesByCarId = new Map(existingVehicles.map(vehicle => [vehicle.carId, vehicle.images]))
  }
}

const vehicles = records.map(record => {
  const carId = record['Car ID']
  if (!carId || seenCarIds.has(carId)) throw new Error(`Invalid or duplicate Car ID: ${carId}`)
  seenCarIds.add(carId)

  const countriesShown = record['Available Countries']
  const countries = countriesShown.split(';').map(country => country.trim()).filter(Boolean)
  const vehicleDescription = record['Vehicle Description']
  const dataQualityNote = record['Data Quality Note']
  const engineShown = record['Engine cc (as shown)']
  const kilometersShown = record['Kilometers (as shown)']
  const statusShown = record.Status
  const vehicleName = record['Vehicle Name (as listed)']

  return {
    listingNo: record['Listing No.'],
    carId,
    id: carId,
    maker: record.Maker,
    model: record.Model,
    vehicleName,
    title: vehicleName,
    type: record.Type,
    year: toNumber(record.Year),
    yearShown: record.Year,
    status: statusShown.toLowerCase(),
    statusShown,
    availableCountries: countries,
    availableCountriesShown: countriesShown,
    availabilityCount: record['Availability Count'],
    mileage: toNumber(kilometersShown),
    kilometersShown,
    price: toNumber(record['Price (USD)']),
    priceUsdShown: record['Price (USD)'],
    currency: 'USD',
    engine: engineShown,
    engineCcShown: engineShown,
    transmission: record.Transmission,
    fuelType: record['Fuel Type'],
    color: record.Color,
    vehicleDescription,
    description: vehicleDescription || dataQualityNote || 'Vehicle details are available on request.',
    dataQualityNote,
    listingPage: record['Listing Page'],
    listingPageUrl: record['Listing Page URL'],
    detailUrl: record['Detail URL'],
    steering: '',
    slug: carId,
    images: existingImagesByCarId.get(carId) || ['/images/vehicles/vehicle-placeholder.svg'],
    features: {
      Specifications: [
        `Engine: ${engineShown || 'Not provided'}`,
        `Transmission: ${record.Transmission || 'Not provided'}`,
        `Fuel type: ${record['Fuel Type'] || 'Not provided'}`,
        `Color: ${record.Color || 'Not provided'}`,
      ],
      Availability: [
        `Countries: ${countriesShown || 'Not provided'}`,
        `Availability count: ${record['Availability Count'] || 'Not provided'}`,
      ],
    },
    createdAt: String(record['Listing No.']).padStart(3, '0'),
  }
})

if (vehicles.length !== 123 || seenCarIds.size !== 123) {
  throw new Error(`Expected 123 rows and unique IDs, got ${vehicles.length} rows and ${seenCarIds.size} IDs`)
}

const banner = '// Generated from adami_motors_all_vehicles.csv. Do not edit manually.\n'
writeFileSync(resolvedOutputPath, `${banner}export const vehicles = ${JSON.stringify(vehicles, null, 2)}\n`, 'utf8')
console.log(`Imported ${vehicles.length} vehicles with ${seenCarIds.size} unique Car IDs into ${outputPath}`)
