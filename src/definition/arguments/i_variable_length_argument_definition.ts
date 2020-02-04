import { IArgumentDefinition } from './i_argument_definition'

export interface IVariableLengthArgumentDefinition extends IArgumentDefinition {
    /**
     * 可変長引数の末尾に付ける番号(採番)の最初の数
     */
    counter_first: number

    /**
     * 可変長引数の型
     */
    inner_type: string
}
