# Find Taiwan Legislator

一個給予臺灣座標得到對應立法委員資訊的服務

## Demo

https://disfactory.github.io/findTaiwanLegislator

## 座標

EPSG:4326

## API

BaseURL: `https://ftl.disfactory.tw`

- GET `/?lng=121.5526163&lat=24.9880455`
  - 給予單一座標得到可能的立委資訊列表
- POST `/list`
  - 給予多個座標得到可能的立委資訊列表
  - response
    - `[{ "lng": 121.5526163, "lat": 24.9880455 }]`

## Mantainence

### 更新選區與行政區範圍

```bash
pnpm run update:data
```

### 更新立委資料

更新 [Disfactory/TaiwanLegislatorData](https://github.com/Disfactory/TaiwanLegislatorData) 並把輸出的 `data/legislators.json` 複製進來。

