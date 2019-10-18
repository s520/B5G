import { ArgumentType } from './argumentType'

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
}

export const listArgument = new ListArgument()
