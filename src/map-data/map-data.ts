import { MapStatement } from '../statements/map-statement'

/**
 * テンプレートエンジンに食わせるマップデータ
 */
export interface MapData {
    /**
     * 構文の定義
     */
    states: MapStatement[]

    /**
     * 全構文のマップ要素名
     */
    elems: string[]

    /**
     * 全構文のマップ副要素名
     */
    subElems: string[]

    /**
     * 全構文のマップ関数名
     */
    funcs: string[]
}
