import { IArgumentDefinition } from '../definition/arguments/i_argument_definition'
import { IArgument } from '../arguments/iArgument'
import { allTypes } from '../argumentTypes/allTypes'
import { listArgument } from '../argumentTypes/listArgument'

/**
 * IArgumentDefinitionに情報を付与したIArguementを生成して返します。
 * @param argDefs 引数定義（IArgumentDefinition）の配列
 */
export const convertArguments = (
    argDefs: IArgumentDefinition[]
): IArgument[] => {
    const args = argDefs.map(argDef => convertArgument(argDef))

    if (args.length < 1) {
        return args
    }

    args.slice(-1)[0].last = true
    return args
}

/**
 * IArgumentDefinitionに情報を付与したIArguementを生成して返します。
 * @param argDef 引数定義（IArgumentDefinition）
 */
const convertArgument = (argDef: IArgumentDefinition): IArgument => {
    const argument: IArgument = <any>argDef
    argument.last = false

    // テスト値の設定
    const targetType = allTypes.find(type => type.isType(argument.type))!
    targetType.setTestValue(argument)

    // list型か？
    argument.isList = listArgument.isType(argument.type)

    return argument
}
