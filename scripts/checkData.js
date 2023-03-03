const fs = require('fs')
const shp = require('shpjs')

async function main () {
  const geojson = await shp(fs.readFileSync("data/administratives.zip"))
  const administrativeToElectoral = JSON.parse(fs.readFileSync("data/electorals.json"))
  const result = []

  const features = geojson.map((el) => el.features).flat()
  for (const feature of features.filter((el) => el.properties.NOTE !== '未編定村里')) {
    if (!administrativeToElectoral.some((ele) => ele.name.startsWith(feature.properties.COUNTYNAME) && ele.areas.some((el) => el.dept === feature.properties.TOWNNAME && el.lis.includes(feature.properties.VILLNAME)))) {
      result.push(feature)
    }
  }

  console.log(result)
}

main().catch(console.error)
