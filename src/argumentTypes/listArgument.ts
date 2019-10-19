import * as Enumerable from 'linq'

import { ArgumentType } from './argumentType'
import { IArgument } from '../definition/iArgument'

/**
 * 可変長引数をテスト用に生成する数
 * 今は固定だがゆくゆくは可変にしたい
 */
const generateArgumentCount = 5

export class ListArgument extends ArgumentType {
    public get type(): string {
        return 'List'
    }

    public get rowTestValue(): string {
        return 'todo'
    }

    public get bve5TestValue(): string {
        return this.rowTestValue
    }

    public get csharpTestValue(): string {
        return this.rowTestValue
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
        type: ArgumentType,
        start: number,
        count: number
    ): IArgument[] {
        const args = Enumerable.range(start, count).select(
            counter =>
                ({
                    name: `${name}${counter}`,
                    type: type.type,
                    desc: description,
                    opt: true,
                    counter_first: undefined,
                    last: false,
                    test_value_map_grammar: type.bve5TestValue,
                    test_value_map_grammar_non_quote: type.rowTestValue,
                    test_value_csharp: type.csharpTestValue,
                    inner_arguments: null
                } as IArgument)
        )

        args.last().last = true
        return args.toArray()
    }
}

export const listArgument = new ListArgument()
