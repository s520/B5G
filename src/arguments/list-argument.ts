import { Argument } from './argument'
import { SingleArgument } from './single-argument';

/**
 * List型の引数を示します。
 */
export interface ListArgument extends Argument {
    /**
     * 引数の型がlistか？
     */
    is_list: boolean

    /**
     * 可変長引数の型
     */
    inner_type: string

    /**
     * 可変長引数の実体
     */
    inner_arguments: SingleArgument[]
}
