import { ArgumentType } from './argument-type'

export class DoubleArgument extends ArgumentType {
    public get type(): string {
        return 'Double'
    }

    public get rowTestValue(): string {
        return '1.0'
    }

    public get bve5TestValue(): string {
        return this.rowTestValue
    }

    public get csharpTestValue(): string {
        return this.rowTestValue
    }
}

export const doubleArgument = new DoubleArgument()
