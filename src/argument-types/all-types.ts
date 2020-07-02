import { ArgumentType } from './argument-type'
import { SingleArgumentType } from './single-argument-type'
import { doubleArgumentType } from './double-argument-type'
import { stringArgumentType } from './string-argument-type'
import { listArgumentType } from './list-argument-type'

export const allTypes: ArgumentType[] = [
    doubleArgumentType,
    stringArgumentType,
    listArgumentType,
]

export const allSingleTypes: SingleArgumentType[] = [
    doubleArgumentType,
    stringArgumentType,
]
