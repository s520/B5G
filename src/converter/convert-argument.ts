import { IArgumentDefinition } from '../definition/arguments/i-argument-definition'
import { IArgument } from '../arguments/i-argument'
import { allTypes } from '../argument-types/all-types'

/**
 * IArgumentDefinitionに情報を付与したIArguementを生成して返します。
 * @param argDefs 引数定義（IArgumentDefinition）の配列
 */
export const convertArguments = (
    argDefs: IArgumentDefinition[]
): IArgument[] => {
    const args = argDefs.map(argDef => allTypes.find(t => t.isType(argDef.type))!.convertDefinitionToArgument(argDef))

    if (args.length < 1) {
        return args
    }

    args.slice(-1)[0].last = true
    return args
}
