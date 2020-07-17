import { convertArguments } from '../../converter/convert-argument'
import { FixedLengthArgumentDefinition } from '../../definition/arguments/fixed-length-argument-definition'
import { VariableLengthArgumentDefinition } from '../../definition/arguments/variable-length-argument-definition'
import { SingleArgument } from '../../arguments/single-argument'
import { ListArgument } from '../../arguments/list-argument'
import { doubleArgumentType } from '../../argument-types/double-argument-type'
import { stringArgumentType } from '../../argument-types/string-argument-type'
import { assertSetISingleArgumentTestValue, assertSetIListArgumentTestValue } from '../helper/assert-set-iargument-testvalue'

describe('convertArguments', () => {
    let fixedLengthArgDef: FixedLengthArgumentDefinition
    let variableLengthArgDef: VariableLengthArgumentDefinition

    beforeEach(
        () =>
            (
                fixedLengthArgDef = {
                    name: 'test',
                    type: 'string',
                    desc: 'test fixed length argument',
                    opt: false,
                },
                variableLengthArgDef = {
                    name: 'test',
                    type: 'list',
                    desc: 'test variable length argument',
                    opt: false,
                    counter_first: 0,
                    inner_type: 'string'
                }
            )
    )

    it('no argument', () => {
        const arg = convertArguments([])
        expect(arg.length).toBe(0)
    })

    it('single fixed length argument', () => {
        const arg = convertArguments([fixedLengthArgDef]) as SingleArgument[]
        expect(arg.length).toBe(1)
        expect(arg[0]).toMatchObject(fixedLengthArgDef)
        expect(arg[0].last).toBeTruthy()
        assertSetISingleArgumentTestValue(arg[0], stringArgumentType)
    })

    it('single variable length argument', () => {
        const arg = convertArguments([variableLengthArgDef]) as ListArgument[]
        expect(arg.length).toBe(1)
        expect(arg[0].name).toBe(variableLengthArgDef.name)
        expect(arg[0].type).toBe(variableLengthArgDef.type)
        expect(arg[0].desc).toBe(variableLengthArgDef.desc)
        expect(arg[0].opt).toBe(variableLengthArgDef.opt)
        expect(arg[0].inner_type).toBe(variableLengthArgDef.inner_type)
        expect(arg[0].last).toBeTruthy()
        expect(arg[0].is_list).toBeTruthy()
        assertSetIListArgumentTestValue(arg[0], stringArgumentType)
    })

    it('multiple argument', () => {
        const argDefs = [
            Object.assign({}, fixedLengthArgDef),
            Object.assign({}, fixedLengthArgDef),
            Object.assign({}, fixedLengthArgDef),
        ]
        argDefs[0].name = 'test1'
        argDefs[1].name = 'test2'
        argDefs[2].name = 'test3'
        argDefs[0].type = 'double?'

        const args = convertArguments(argDefs) as SingleArgument[]
        expect(args.length).toBe(argDefs.length)
        expect(args[0]).toMatchObject(argDefs[0])
        expect(args[0].last).toBeFalsy()
        assertSetISingleArgumentTestValue(args[0], doubleArgumentType)
        expect(args[1]).toMatchObject(argDefs[1])
        expect(args[1].last).toBeFalsy()
        assertSetISingleArgumentTestValue(args[1], stringArgumentType)
        expect(args[2]).toMatchObject(argDefs[2])
        expect(args[2].last).toBeTruthy()
        assertSetISingleArgumentTestValue(args[2], stringArgumentType)
    })
})
