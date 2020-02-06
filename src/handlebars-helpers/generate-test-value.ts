import { listArgument } from '../argument-types/list-argument'
import { allTypes, getType } from '../argument-types/all-types'

/**
 * C#用テスト値を引数の型名を元に生成します。
 * @param typeName 引数の型名
 */
export const generateCSharpTestValue = (typeName: string): string => {
    const targetType = getType(typeName)
    if (!targetType) { throw new Error(`'${typeName}' is an undefined argument type.`) }
    if (targetType === listArgument) { throw new Error('Generating C# test values for List type arguments is not supported.') }
    return targetType.csharpTestValue
}
