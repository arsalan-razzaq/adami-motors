import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { vehicles } from '../src/data/vehicles.js'

const sourcePath = process.argv[2]
if (!sourcePath) throw new Error('Usage: node scripts/validate-vehicles.mjs <source.csv>')

const sourceLines = readFileSync(resolve(sourcePath), 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/)
const sourceCarIds = sourceLines.slice(1).map(line => line.split(',', 3)[1])
const generatedCarIds = vehicles.map(vehicle => vehicle.carId)
const uniqueCarIds = new Set(generatedCarIds)
const requiredUiFields = ['carId', 'title', 'maker', 'model', 'type', 'year', 'statusShown', 'availableCountriesShown', 'kilometersShown', 'priceUsdShown', 'engineCcShown', 'transmission', 'fuelType', 'color', 'description']

const missingSourceRows = sourceCarIds.filter(carId => !uniqueCarIds.has(carId))
const duplicateCarIds = generatedCarIds.filter((carId, index) => generatedCarIds.indexOf(carId) !== index)
const invalidUiRecords = vehicles.filter(vehicle => requiredUiFields.some(field => vehicle[field] === undefined || vehicle[field] === null || vehicle[field] === ''))
const nonLocalImages = vehicles.flatMap(vehicle => vehicle.images).filter(image => !image.startsWith('/images/'))
const routeLookupMisses = vehicles.filter(vehicle => !vehicles.find(item => String(item.carId) === String(vehicle.carId)))
const nullishValues = []

function findNullish(value, path = '') {
  if (value === null || value === undefined) {
    nullishValues.push(path)
    return
  }
  if (Array.isArray(value)) value.forEach((item, index) => findNullish(item, `${path}[${index}]`))
  else if (typeof value === 'object') Object.entries(value).forEach(([key, item]) => findNullish(item, path ? `${path}.${key}` : key))
}

vehicles.forEach((vehicle, index) => findNullish(vehicle, `vehicles[${index}]`))

const summary = {
  sourceRows: sourceCarIds.length,
  generatedVehicles: vehicles.length,
  uniqueCarIds: uniqueCarIds.size,
  missingSourceRows: missingSourceRows.length,
  duplicateCarIds: duplicateCarIds.length,
  invalidUiRecords: invalidUiRecords.length,
  nonLocalImages: nonLocalImages.length,
  routeLookupMisses: routeLookupMisses.length,
  nullishValues: nullishValues.length,
  paginationPagesAt12: Math.ceil(vehicles.length / 12),
}

console.log(JSON.stringify(summary, null, 2))

if ([summary.missingSourceRows, summary.duplicateCarIds, summary.invalidUiRecords, summary.nonLocalImages, summary.routeLookupMisses, summary.nullishValues].some(value => value !== 0)) {
  throw new Error('Vehicle data validation failed')
}

if (summary.sourceRows !== 123 || summary.generatedVehicles !== 123 || summary.uniqueCarIds !== 123) {
  throw new Error('Vehicle totals do not match the required 123 records')
}
