import { getDefaultMapData } from './default-map-data'

// mapDataのテスト出力用
getDefaultMapData()
    .then((mapData) => {
        console.log('default map definition load successful.')
        console.log(JSON.stringify(mapData, null, '\t'))
    })
    .catch((error) => console.error(error))
