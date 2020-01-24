import * as Enumerable from 'linq'

import { ArgumentType } from './argumentType'
import { IArgument } from '../definition/iArgument'
import { allTypes } from './allTypes'

/**
 * 可変長引数をテスト用に生成する数
 * 今は固定だがゆくゆくは可変にしたい
 */
export const generateArgumentCount = 5

export class ListArgument extends ArgumentType {
    public get type(): string {
        return 'List'
    }

    // FIXME: rowTestValue, bve5TestValue, csharpTestValueはlistだと使わないが抽象クラスで実装されているので必ず実装する必要がある。
    // 使わないプロパティを強制実装される設計がアレなので修正したい
    public get rowTestValue(): string {
        return 'dummy'
    }

    public get bve5TestValue(): string {
        return this.rowTestValue
    }

    public get csharpTestValue(): string {
        return this.rowTestValue
    }

    public setTestValue(arg: IArgument): IArgument {
        // TODO: ここで引数を生成する前にバリデートが必要
        arg.inner_arguments = this.generateRangeArgs(
            arg.name,
            arg.desc,
            allTypes.find(t => t.isType(arg.inner_type!))!,
            arg.counter_first!,
            generateArgumentCount
        )

        return super.setTestValue(arg)
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
            _ =>
                ({
                    name: name,
                    type: type.type,
                    desc: description,
                    opt: true,
                    counter_first: undefined,
                    last: false,
                    test_value_map_grammar: type.bve5TestValue,
                    test_value_map_grammar_non_quote: type.rowTestValue,
                    test_value_csharp: type.csharpTestValue,
                    isList: this.isType(type.type),
                    inner_arguments: null
                } as IArgument)
        ).toArray()

        args[0].opt = false
        args.slice(-1)[0].last = true

        return args
    }
}

export const listArgument = new ListArgument()