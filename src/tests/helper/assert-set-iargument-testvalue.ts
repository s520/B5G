import { SingleArgument } from '../../arguments/single-argument'
import { SingleArgumentType } from '../../argument-types/single-argument-type'

/**
 * 引数に与えられたSingleArgumentのテスト用値が引数に与えられた型と一致するか確認します。
 * @param argument テスト用値をチェックする対象の引数
 * @param type テスト用値の型
 */
export const assertSetISingleArgumentTestValue = (
    argument: SingleArgument,
    type: SingleArgumentType
): void => {
    expect(argument.test_value_map_grammar).toBe(type.bve5TestValue)
    expect(argument.test_value_map_grammar_non_quote).toBe(type.rowTestValue)
    expect(argument.test_value_csharp).toBe(type.csharpTestValue)
}
