import { ArgumentType } from './argumentType'
import { doubleArgument } from './doubleArgument'
import { stringArgument } from './stringArgument'
import { listArgument } from './listArgument'

export const allTypes: ArgumentType[] = [
    doubleArgument,
    stringArgument,
    listArgument
]
