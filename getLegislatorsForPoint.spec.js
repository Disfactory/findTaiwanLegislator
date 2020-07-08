const { getLegislators } = require('./getLegislatorsForPoint')
const fs = require('fs')

const testData = [
  {
    lng: 120.09575843811,
    lat: 23.22219022985,
    name: ['賴惠員']
  },
  {
    lng: 121.5526163,
    lat: 24.9880455,
    name: ['賴士葆']
  },
  {
    lng: 120.14042258263,
    lat: 23.146673835102,
    name: ['郭國文']
  },
  {
    lng: 120.15512108803,
    lat: 23.653251298907,
    name: ['蘇治芬']
  },
  {
    lng: 120.16806006432,
    lat: 23.456081334622,
    name: ['蔡易餘']
  },
  {
    lng: 120.24255037308,
    lat: 22.755267684239,
    name: ['邱志偉']
  }
]

for (const data of testData) {
  it(`getLegislators ${data.name}`, async () => {
    const legislators = await getLegislators(data.lng, data.lat)

    expect(legislators.map((el) => el.name)).toEqual(data.name)
  })
}

