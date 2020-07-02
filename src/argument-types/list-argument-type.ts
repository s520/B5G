import * as Enumerable from 'linq'

import { ArgumentType } from './argument-type'
import { Argument } from '../arguments/argument'
import { ArgumentDefinition } from '../definition/arguments/argument-definition'
import { allSingleTypes } from './all-types'
import { VariableLengthArgumentDefinition } from '../definition/arguments/variable-length-argument-definition'
import { ListArgument } from '../arguments/list-argument'
import { SingleArgumentType } from './single-argument-type'
import { SingleArgument } from '../arguments/single-argument'

/**
 * 可変長引数をテスト用に生成する数
 * 今は固定だがゆくゆくは可変にしたい
 */
export const generateArgumentCount = 5

export class ListArgumentType extends ArgumentType {
    public get type(): string {
        return 'List'
    }

    public convertDefinitionToArgument(argDef: ArgumentDefinition): Argument {
        // TODO: 本当にargDefがIVariableLengthArgumentDefinitionを実装しているか確認が必要
        const vArgDef = argDef as VariableLengthArgumentDefinition

        const argument: ListArgument = {
            ...super.convertDefinitionToArgument(argDef),
            is_list: true,
            inner_type: vArgDef.inner_type,
            inner_arguments: this.generateRangeArgs(
                vArgDef.name,
                vArgDef.desc,
                allSingleTypes.find((t) => t.isType(vArgDef.inner_type))!,
                vArgDef.counter_first,
                generateArgumentCount
            ),
        }

        return argument
    }

    /**
     * 可変長引数を生成して返します。
     * @param name 引数名
     * @param description 引数の説明
     * @param type 引数の型
     * @param start 引数の開始番号
     * @param count 生成する引数の数
     */
    private generateRangeArgs(
        name: string,
        description: string,
        type: SingleArgumentType,
        start: number,
        count: number
    ): SingleArgument[] {
        const args = Enumerable.range(start, count)
            .select(
                (_) =>
                    ({
                        name: name,
                        type: type.type,
                        desc: description,
                        opt: true,
                        last: false,
                        test_value_map_grammar: type.bve5TestValue,
                        test_value_map_grammar_non_quote: type.rowTestValue,
                        test_value_csharp: type.csharpTestValue,
                    } as SingleArgument)
            )
            .toArray()

        args[0].opt = false
        args.slice(-1)[0].last = true

        return args
    }
}

export const listArgumentType = new ListArgumentType()
