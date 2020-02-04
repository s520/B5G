import * as handlebars from 'handlebars'
import { IMapData } from './map-data/i-map-data'

/**
 * ステートメントをテンプレートに書き出します。
 * @param template Mustacheのレンダー先
 * @param mapData 出力対象のデータ
 */
export const render = (template: string, mapData: IMapData): string => {
    const compiledTemplate = handlebars.compile(template)
    return compiledTemplate(mapData)
}
