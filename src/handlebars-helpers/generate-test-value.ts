import { listArgument } from '../argument-types/list-argument'
import { getType } from '../argument-types/all-types'
import { ArgumentType } from '../argument-types/argument-type'

/**
 * C#用テスト値を引数の型名を元に生成します。
 * @param typeName 引数の型名
 */
export const generateCSharpTestValue = (typeName: string): string => getPrimitiveType(typeName).csharpTestValue

/**
 * プリミティブ型を引数の型名から取得します。
 * 型名が無効な場合や、プルミティブ型以外の場合は例外を投げます。
 * @param typeName 引数の型名
 */
const getPrimitiveType = (typeName: string): ArgumentType => {
    const targetType = getType(typeName)
    if (!targetType) { throw new Error(`'${typeName}' is an undefined argument type.`) }
    if (targetType === listArgument) { throw new Error('Generating C# test values for List type arguments is not supported.') }
    return targetType
}
