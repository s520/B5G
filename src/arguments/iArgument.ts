import { IArgumentDefinition } from '../definition/arguments/i_argument_definition'

/**
 * 引数定義
 */
export interface IArgument extends IArgumentDefinition {
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

    //#region list用

    /**
     * 引数の型がlistか？
     */
    isList: boolean

    /**
     * Typeがlistのときに使用する可変長引数
     */
    inner_arguments: IArgument[] | null
    //#endregion
}
