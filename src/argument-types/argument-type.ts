import { Argument } from '../arguments/argument'
import { ArgumentDefinition } from '../definition/arguments/argument-definition'

/**
 * 引数の型定義
 */
export abstract class ArgumentType {
    /**
     * 型名
     */
    public abstract get type(): string

    /**
     * テストに用いる加工なしの値
     */
    public abstract get rowTestValue(): string

    /**
     * BVE5の構文上で引数と認識される形式のテスト値
     */
    public abstract get bve5TestValue(): string

    /**
     * C#上で認識される形式のテスト値
     */
    public abstract get csharpTestValue(): string

    /**
     * 引数に与えられた型名と一致するか？
     * 型名は大文字小文字＆空白無視で判定します。
     * @param type 型名
     */
    public isType(type: string): boolean {
        return (
            type.trim().replace('?', '').toLowerCase() ===
            this.type.toLowerCase()
        )
    }

    /**
     * 引数にテスト値をセットして返します。
     * @param arg iArgument
     */
    public setTestValue(arg: Argument): Argument {
        arg.test_value_map_grammar = this.bve5TestValue
        arg.test_value_map_grammar_non_quote = this.rowTestValue
        arg.test_value_csharp = this.csharpTestValue
        return arg
    }

    /**
     * iArgumentDefinitionをiArgumentに変換します。
     * @param argDef iArgumentDefinition
     */
    public convertDefinitionToArgument(argDef: ArgumentDefinition): Argument {
        const argument: Argument = {
            name: argDef.name,
            type: argDef.type,
            desc: argDef.desc,
            opt: argDef.opt,
            last: false,
            test_value_map_grammar: this.bve5TestValue,
            test_value_map_grammar_non_quote: this.rowTestValue,
            test_value_csharp: this.csharpTestValue,
        }

        return argument
    }
}
