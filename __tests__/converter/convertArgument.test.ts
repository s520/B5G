import { ArgumentType } from '../../src/common/argumentTypes';
import { convertArguments } from '../../src/converter/convertArgument'
import { IArgumentDefinition } from '../../src/definition/iArgumentDefinition';
import { IArgument } from '../../src/definition/iArgument';

const testValueCheck = (argument: IArgument, type: ArgumentType): void => {
    expect(argument.test_value_map_grammar).toBe(type.bve5TestValue)
    expect(argument.test_value_map_grammar_non_quote).toBe(type.rowTestValue)
    expect(argument.test_value_csharp).toBe(type.csharpTestValue)
}

describe('convertArguments', () => {
    let argDefinition: IArgumentDefinition

    beforeEach(() => argDefinition = {
        name: 'test',
        type: 'string',
        arg_description_md: 'test argument',
        opt: false
    })

    it('no argument', () => {
        const arg = convertArguments([])
        expect(arg.length).toBe(0)
    })

    it('single argument', () => {
        const arg = convertArguments([argDefinition])
        expect(arg.length).toBe(1)
        expect(arg[0]).toMatchObject(argDefinition)
        expect(arg[0].last).toBeTruthy()
        testValueCheck(arg[0], ArgumentType.string)
    })

    it('multiple argument', () => {
        const argDefs = [
            Object.assign({}, argDefinition),
            Object.assign({}, argDefinition),
            Object.assign({}, argDefinition)
        ]
        argDefs[0].name = 'test1'
        argDefs[1].name = 'test2'
        argDefs[2].name = 'test3'
        argDefs[0].type = 'double?'

        const args = convertArguments(argDefs)
        expect(args.length).toBe(argDefs.length)
        expect(args[0]).toMatchObject(argDefs[0])
        expect(args[0].last).toBeFalsy()
        testValueCheck(args[0], ArgumentType.double)
        expect(args[1]).toMatchObject(argDefs[1])
        expect(args[1].last).toBeFalsy()
        testValueCheck(args[1], ArgumentType.string)
        expect(args[2]).toMatchObject(argDefs[2])
        expect(args[2].last).toBeTruthy()
        testValueCheck(args[2], ArgumentType.string)
    })
})
