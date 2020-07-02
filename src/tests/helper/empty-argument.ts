import { SingleArgument } from '../../arguments/single-argument'

/**
 * 空の引数を生成して返します。
 */
export const createEmptySingleArgument = (): SingleArgument => {
    return {
        name: '',
        type: '',
        desc: '',
        opt: false,
        last: null,
        test_value_map_grammar: '',
        test_value_map_grammar_non_quote: '',
        test_value_csharp: '',
    } as SingleArgument
}
