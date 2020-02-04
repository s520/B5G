import { IMapDefinition } from './definition/iMapDefinition'
import { convertMapStatement } from './converter/convertMapStatement'
import { IMapData } from './mapdata/iMapData'
import { createMapData } from './converter/createMapData'

/**
 * 引数に指定された全てのマップ構文定義をIMapDataに変換します。
 * @param mapDefinitions 変換対象のマップ構文定義
 */
export const convert = (mapDefinition: IMapDefinition[]): IMapData => {
    const statements = mapDefinition.map(mapDef => convertMapStatement(mapDef))
    return createMapData(statements)
}
