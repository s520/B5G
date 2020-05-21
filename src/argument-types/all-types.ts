import { ArgumentType } from './argument-type'
import { doubleArgument } from './double-argument'
import { stringArgument } from './string-argument'
import { listArgument } from './list-argument'

export const allTypes: ArgumentType[] = [
    doubleArgument,
    stringArgument,
    listArgument,
]
