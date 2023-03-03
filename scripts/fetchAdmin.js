process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const fetch = require('node-fetch')
const fs = require('fs')

const datasetUrl = 'https://data.gov.tw/dataset/7438'

async function main () {
  const responseData = await fetch(datasetUrl).then((res) => res.text())

  // const url = /<a .*href="([\w./?:=&-]+)".*>SHP<\/a>/.exec(responseData)[1]
  const url = 'https://data.moi.gov.tw/MoiOD/System/DownloadFile.aspx?DATA=B8AF344F-B5C6-4642-AF46-1832054399CE'

  if (!url) throw new Error('Cann\'t parse file url in dataset.')

  const file = await fetch(url).then((res) => res.arrayBuffer())
  fs.writeFileSync('data/administratives.zip', Buffer.from(file))
}

console.log('Start fetch administratives')
console.time('Finish fetch administratives')
main().then(() => console.timeEnd('Finish fetch administratives')).catch(console.error)
