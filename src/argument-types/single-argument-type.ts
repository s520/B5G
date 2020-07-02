import { ArgumentType } from './argument-type'
import { Argument } from '../arguments/argument'
import { SingleArgument } from '../arguments/single-argument'
import { ArgumentDefinition } from '../definition/arguments/argument-definition'

export abstract class SingleArgumentType extends ArgumentType {
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
     * 引数にテスト値をセットして返します。
     * @param arg SingleArgument
     */
    public setTestValue(arg: SingleArgument): SingleArgument {
        arg.test_value_map_grammar = this.bve5TestValue
        arg.test_value_map_grammar_non_quote = this.rowTestValue
        arg.test_value_csharp = this.csharpTestValue
        return arg
    }

    public convertDefinitionToArgument(argDef: ArgumentDefinition): Argument {
        const argument: SingleArgument = {
            ...super.convertDefinitionToArgument(argDef),
            test_value_map_grammar: this.bve5TestValue,
            test_value_map_grammar_non_quote: this.rowTestValue,
            test_value_csharp: this.csharpTestValue,
        }

        return argument
    }
}
