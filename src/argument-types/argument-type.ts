import { Argument } from '../arguments/argument'
import { ArgumentDefinition } from '../definition/arguments/argument-definition'

/**
 * 引数の型定義
 */
export abstract class ArgumentType {
    /**
     * 型名
     */
    public abstract get type(): string

    /**
     * 引数に与えられた型名と一致するか？
     * 型名は大文字小文字＆空白無視で判定します。
     * @param type 型名
     */
    public isType(type: string): boolean {
        return (
            type.trim().replace('?', '').toLowerCase() ===
            this.type.toLowerCase()
        )
    }

    /**
     * iArgumentDefinitionをiArgumentに変換します。
     * @param argDef iArgumentDefinition
     */
    public convertDefinitionToArgument(argDef: ArgumentDefinition): Argument {
        const argument: Argument = {
            name: argDef.name,
            type: argDef.type,
            desc: argDef.desc,
            opt: argDef.opt,
            last: false,
        }

        return argument
    }
}
