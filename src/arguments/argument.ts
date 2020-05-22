/**
 * 引数定義
 */
export interface Argument {
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

    /**
     * 最後の引数か？
     * 最後の引数以外はカンマを付ける関係で使う
     */
    last: boolean | null

    /**
     * テスト用値(構文出力用)
     */
    test_value_map_grammar: string

    /**
     * テスト用値
     */
    test_value_map_grammar_non_quote: string

    /**
     * C#用テスト値
     */
    test_value_csharp: string
}
