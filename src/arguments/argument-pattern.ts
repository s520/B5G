import { Argument } from './argument'

/**
 * 構文の引数がとり得るパターン定義
 * テストの生成時に使います。
 */
export interface ArgumentPattern {
    /**
     * 対象の引数
     */
    args: Argument[]

    /**
     * テスト対象のBve5マップバージョン
     */
    version: string

    /**
     * テストにV1Parserを使用するか？
     */
    useV1Parser: boolean

    /**
     * テストにV2Parserを使用するか?
     */
    useV2Parser: boolean
}
