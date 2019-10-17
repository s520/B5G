import { ArgumentType } from './argumentType'

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
