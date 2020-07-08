# Find Taiwan Legislator
一個給予臺灣座標得到對應立法委員資訊的服務

## Demo
https://disfactory.github.io/findTaiwanLegislator

## API
BaseURL: `https://ftl.disfactory.tw`

- GET `/?lng=121.5526163&lat=24.9880455`
  - 給予單一座標得到可能的立委資訊列表
- POST `/list`
  - 給予多個座標得到可能的立委資訊列表
  - response
    - `[{ "lng": 121.5526163, "lat": 24.9880455 }]`


