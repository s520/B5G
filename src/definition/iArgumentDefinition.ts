/**
 * mapgrammar.yamlの引数定義スキーマ
 */
export interface IArgumentDefinition {
    /**
     * 引数名
     */
    name: string

    /**
     * 引数の型
     */
    type: string

    /**
     * 引数の説明
     */
    desc: string

    /**
     * 省略可能な引数か？
     */
    opt: boolean

    //#region list用
    /**
     * 可変長引数の末尾に付ける番号(採番)の最初の数
     */
    counter_first: number | undefined
    //#endregion
}
