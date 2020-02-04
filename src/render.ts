import * as handlebars from 'handlebars'
import stripBom from 'strip-bom'
import { IMapData } from './mapdata/iMapData'

/**
 * ステートメントをテンプレートに書き出します。
 * @param template Mustacheのレンダー先
 * @param mapData 出力対象のデータ
 */
export const render = (template: string, mapData: IMapData): string => {
    const compiledTemplate = handlebars.compile(template)
    return compiledTemplate(mapData)
}
