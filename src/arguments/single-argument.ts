import { Argument } from './argument'

/**
 * 単一の引数を示します。
 */
export interface SingleArgument extends Argument {
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
