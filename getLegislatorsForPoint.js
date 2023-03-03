const turf = require('@turf/turf')
const shp = require('shpjs')
const fs = require('fs')

let originalData = null
const resultCache = new Map()

async function prepareData () {
  if (originalData) return originalData

  const geojson = await shp(fs.readFileSync("data/administratives.zip"))
  const administrativeToElectoral = JSON.parse(fs.readFileSync("data/electorals.json"))
  const electoralToLegislator = JSON.parse(fs.readFileSync("data/legislators.json"))
  originalData = { geojson, administrativeToElectoral, electoralToLegislator }

  return originalData
}

function getAdministratives (geojson) {
  const features = geojson.map((el) => el.features).flat()
  return features.map((el) => {
    const getProperties = (el) => ({ county: el.properties.COUNTYNAME, town: el.properties.TOWNNAME, vill: el.properties.VILLNAME })

    if (el.geometry.type === 'Polygon') {
      return turf.polygon(el.geometry.coordinates, getProperties(el))
    }

    if (el.geometry.type === 'MultiPolygon') {
      return turf.multiPolygon(el.geometry.coordinates, getProperties(el))
    }

    throw new Error('Not support geometry type')
  })
}

async function getLegislators (lng, lat) {
  const hashKey = `${lng}:${lat}`
  if (resultCache.has(hashKey)) return resultCache.get(hashKey)
  const { geojson, administrativeToElectoral, electoralToLegislator } = await prepareData()
  const administratives = getAdministratives(geojson)

  const point = turf.point([lng, lat])

  const pointAdministratives = administratives.filter((el) => turf.booleanPointInPolygon(point, el)).map((el) => el.properties)
  if (pointAdministratives.length === 0) throw new Error('Cannot convert point to administrative districts')
  const pointElectorals = pointAdministratives.map((admin) => administrativeToElectoral.find((ele) => ele.name.startsWith(admin.county) && ele.areas.some((el) => el.dept === admin.town && el.lis.includes(admin.vill))).name)
  if (pointAdministratives.length === 0) throw new Error('Cannot convert administrative districts to electoral districts')
  const result = pointElectorals.map((electoral) => electoralToLegislator.find((el) => el.選區 === electoral))
  if (pointAdministratives.length === 0) throw new Error('Cannot convert electoral districts to legislator')

  resultCache.set(hashKey, result)
  return result
}

module.exports = { prepareData, getLegislators }
