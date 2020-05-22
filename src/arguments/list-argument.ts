import { Argument } from './argument'

/**
 * List型の引数を示します。
 */
export interface ListArgument extends Argument {
    /**
     * 引数の型がlistか？
     */
    isList: boolean

    /**
     * 可変長引数の実体
     */
    inner_arguments: Argument[]
}
