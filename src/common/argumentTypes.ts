// #region インタフェース定義
/**
 * 引数の型
 */
export interface IArgumentType {
    /**
     * 型名
     */
    readonly typeName: string

    /**
     * テストに用いる値
     */
    readonly testValue: string

    /**
     * 引数に指定された型が一致するか？
     * @param typeString 型名を示す文字列
     */
    isType(typeString: string): boolean

    /**
     * Bveの構文上で引数として認識される値を取得します。
     */
    getOutputValue(): string

    /**
     * C#上でテストに用いる値を取得します。
     */
    getCSharpTestValue(): string
}
// #endregion

/**
 * 引数の型定義
 */
export class ArgumentType {

    /**
     * Double
     */
    public static double = new ArgumentType('Double', '1.0', val => val, val => val)

    /**
     * String
     */
    public static string = new ArgumentType(
        'String',
        'string_test_value',
        val => `'${val}'`,
        val => `"${val}"`)

    /**
     * 全ての型
     */
    public static get allTypes(): ArgumentType[] {
        return [this.double, this.string]
    }

    /**
     * 型名
     */
    public get type(): string {
        return this.typeName
    }

    /**
     * テストに用いる加工なしの値
     */
    public get rowTestValue(): string {
        return this.testValue
    }

    /**
     * BVE5の構文上で引数と認識される形式のテスト値
     */
    public get bve5TestValue(): string {
        return this.toBve5TestValue(this.testValue)
    }

    /**
     * C#上で認識される形式のテスト値
     */
    public get csharpTestValue(): string {
        return this.toCsharpTestValue(this.testValue)
    }

    private constructor(
        private readonly typeName: string,
        private readonly testValue: string,
        private readonly toBve5TestValue: (testValue: string) => string,
        private readonly toCsharpTestValue: (testValue: string) => string
    ) {}

    /**
     * 引数に与えられた型名と一致するか？
     * 型名は大文字小文字＆空白無視で判定します。
     * @param type 型名
     */
    public isType(type: string): boolean {
        return type.trim().replace('?', '').toLowerCase() === this.typeName.toLowerCase()
    }
}

/**
 * Double型
 */
export class DoubleArgument implements IArgumentType {
    readonly typeName = 'Double'
    readonly testValue = '1.0'

    isType(typeString: string): boolean {
        // 現在は大文字小文字無視で型名を判定している
        return (
            typeString.replace('?', '').toLowerCase() ===
            this.typeName.toLowerCase()
        )
    }

    getOutputValue(): string {
        return this.testValue
    }

    getCSharpTestValue(): string {
        return this.testValue
    }
}

/**
 * String型
 */
export class StringArgument implements IArgumentType {
    readonly typeName = 'String'
    readonly testValue = 'string_value'

    isType(typeString: string): boolean {
        return (
            typeString.replace('?', '').toLowerCase() ===
            this.typeName.toLowerCase()
        )
    }

    getOutputValue(): string {
        return `'${this.testValue}'`
    }

    getCSharpTestValue(): string {
        return `"${this.testValue}"`
    }
}

/**
 * 引数の型定義
 */
export const argumentTypes: IArgumentType[] = [
    new DoubleArgument(),
    new StringArgument()
]
