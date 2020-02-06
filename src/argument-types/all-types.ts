import { ArgumentType } from './argument-type'
import { doubleArgument } from './double-argument'
import { stringArgument } from './string-argument'
import { listArgument } from './list-argument'

export const allTypes: ArgumentType[] = [
    doubleArgument,
    stringArgument,
    listArgument
]

/**
 * 引数に与えられた型名から引数型を取得します。
 * @param typeName 型名
 */
export const getType = (typeName: string): ArgumentType | undefined => allTypes.find(t => t.isType(typeName))
