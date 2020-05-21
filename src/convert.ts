import { MapDefinition } from './definition/map-definition'
import { convertMapStatement } from './converter/convert-map-statement'
import { MapData } from './map-data/map-data'
import { createMapData } from './converter/create-map-data'

/**
 * 引数に指定された全てのマップ構文定義をIMapDataに変換します。
 * @param mapDefinitions 変換対象のマップ構文定義
 */
export const convert = (mapDefinition: MapDefinition[]): MapData => {
    const statements = mapDefinition.map((mapDef) =>
        convertMapStatement(mapDef)
    )
    return createMapData(statements)
}
