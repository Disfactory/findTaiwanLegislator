process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const fetch = require('node-fetch')
const Promise = require('bluebird')
const fs = require('fs')

const datasetUrl = 'https://data.gov.tw/dataset/114715'

async function main () {
  const responseData = await fetch(datasetUrl).then((res) => res.text())

  const urls = new Set(Array.from(responseData.matchAll(/https:\/\/[0-9]+\.cec\.gov\.tw\/data\/json\/area\/[0-9]+\.json/g), (el) => el[0]))
  
  const datas = await Promise.map(urls, (url) => fetch(url).then((res) => res.json()), { concurrency: 5 })
  const result = datas.map((el) => el.area).flat().map((el) => {
    return {
      name: el.areaName.trim(),
      areas: el.depts.map((dept) => ({ dept: dept.deptName , lis: dept.lis.map((li) => li.liName.trim()) })).flat()
    }
  })
  
  fs.writeFileSync('data/electorals.json', JSON.stringify(result))
}

console.log('Start fetch electorals')
console.time('Finish fetch electorals')
main().then(() => console.timeEnd('Finish fetch electorals')).catch(console.error)
