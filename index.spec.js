const fetch = require('node-fetch')

describe('API', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
    require('./index.js')
  })

  it('success fetch GET /', async (done) => {
    const lng = 120.09575843811
    const lat = 23.22219022985
    const res = await fetch(`http://localhost:8888?lng=${lng}&lat=${lat}`)
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data.length).toBe(1)
    expect(data[0]).toBeDefined()
    expect(typeof data[0].name).toEqual('string')
    done()
  })

  it('failed when wrong query params fetch GET /', async (done) => {
    const lng = 120.09575843811
    const lat = 23.22219022985
    const res = await fetch(`http://localhost:8888?ln=${lng}&la=${lat}`)
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.message).toBeDefined()
    done()
  })

  it('success fetch POST /list', async (done) => {
    const points = [
      { lng: 120.09575843811, lat: 23.22219022985 },
      { lng: 121.5526163, lat: 24.9880455 }
    ]

    const res = await fetch(`http://localhost:8888/list`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(points) })
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data.length).toBe(2)

    expect(Array.isArray(data[0])).toBeTruthy()
    expect(data[0].length).toBe(1)
    expect(typeof data[0][0].name).toEqual('string')

    expect(Array.isArray(data[1])).toBeTruthy()
    expect(data[1].length).toBe(1)
    expect(typeof data[1][0].name).toEqual('string')
    done()
  })

  it('failed when wrong body content fetch POST /list', async (done) => {
    const points = [
      { ln: 120.09575843811, lat: 23.22219022985 },
      { lng: 121.5526163, lat: 24.9880455 }
    ]

    const res = await fetch(`http://localhost:8888/list`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(points) })
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.message).toBeDefined()
    done()
  })

  it('part failed when system error fetch POST /list', async (done) => {
    const points = [
      { lng: 120.09575843811, lat: 23.22219022985 },
      { lng: 121.5526163, lat: 24.9880455 },
      { lng: 120, lat: 23 },
    ]

    const res = await fetch(`http://localhost:8888/list`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(points) })
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data.length).toBe(3)

    expect(Array.isArray(data[0])).toBeTruthy()
    expect(data[0].length).toBe(1)
    expect(typeof data[0][0].name).toEqual('string')

    expect(Array.isArray(data[1])).toBeTruthy()
    expect(data[1].length).toBe(1)
    expect(typeof data[1][0].name).toEqual('string')

    expect(Array.isArray(data[2])).toBeFalsy()
    expect(data[2].message).toBeDefined()
    expect(typeof data[2].message).toEqual('string')
    done()
  })
})
