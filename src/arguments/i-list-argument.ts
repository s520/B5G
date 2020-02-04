import { IArgument } from './i-argument'

/**
 * List型の引数を示します。
 */
export interface IListArgument extends IArgument {
    /**
     * 引数の型がlistか？
     */
    isList: boolean

    /**
     * 可変長引数の実体
     */
    inner_arguments: IArgument[]
}
