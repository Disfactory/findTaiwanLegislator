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
    expect(res.ok).toBeTruthy()

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

    expect(res.ok).toBeFalsy()
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.message).toBeDefined()
    done()
  })
})
