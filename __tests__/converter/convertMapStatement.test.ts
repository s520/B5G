import { IMapDefinition } from '../../src/definition/iMapDefinition'
import { IArgument } from '../../src/definition/iArgument'
import { IArgumentDefinition } from '../../src/definition/iArgumentDefinition';
import { convertMapStatement } from '../../src/converter/convertMapStatement'

// syntaxType等のUnitTestはiMapDefinition.test.tsで行う
describe('convertMapStatement()', () => {
    let argDefinition: IArgumentDefinition
    let mapDefinition: IMapDefinition

    beforeEach(() => {
        argDefinition = {
            name: 'Argument',
            type: 'string',
            desc: 'test argument',
            opt: false,
            counter_first: undefined
        }
        mapDefinition = {
            elem: 'Element',
            key: 'Key',
            sub_elem: 'SubElement',
            func: 'Function',
            versions: [
                '2.02'
            ],
            args: [argDefinition],
            argPatterns: ['Argument'],
            skip_test: false
        }
    })

    it('convert', () => {
        const state = convertMapStatement(mapDefinition)
        expect(state).toMatchObject(mapDefinition)
        expect(state.args[0]).toMatchObject(argDefinition)
        expect(state.syntax1).toBeFalsy()
        expect(state.syntax2).toBeFalsy()
        expect(state.syntax3).toBeTruthy()
    })

    describe('detect syntax type', () => {

        it('detect syntax type with argument and func', () => {
            const state = convertMapStatement(mapDefinition)
            expect(state.nofunc).toBeFalsy()
            expect(state.noarg).toBeFalsy()
        })

        it('detect syntax type with not contains argument and func', () => {
            mapDefinition.args = []
            mapDefinition.argPatterns = []
            mapDefinition.func = undefined
            const state = convertMapStatement(mapDefinition)
            expect(state.nofunc).toBeTruthy()
            expect(state.noarg).toBeTruthy()
        })
    })

    describe('create lower identifier', () => {

        it('create lower identifier', () => {
            const state = convertMapStatement(mapDefinition)
            expect(state.elem_lower).toBe('element')
            expect(state.sub_elem_lower).toBe('subelement')
            expect(state.func_lower).toBe('function')
        })

        it('create lower identifier with no contains subelem and func', () => {
            mapDefinition.sub_elem = undefined
            mapDefinition.func = undefined
            const state = convertMapStatement(mapDefinition)
            expect(state.elem_lower).toBe('element')
            expect(state.sub_elem_lower).toBeUndefined()
            expect(state.func_lower).toBeUndefined()
        })
    })

    // 引数変換のUnitTestはconvertArgument.test.tsで行う
    describe('conver argument', () => {

        it('convert', () => {
            const state = convertMapStatement(mapDefinition)
            expect(state.args.length).toBe(mapDefinition.args.length)
            expect(state.args[0]).toMatchObject(argDefinition)
            const arg = state.args as IArgument[]
            expect(arg[0].last).toBeTruthy()
        })
    })

    describe('create argument pattern', () => {

        it('no versions', () => {
            mapDefinition.versions = []
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(0)
        })

        it('version 1', () => {
            mapDefinition.versions = ['1.00']
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(1)
            expect(state.argPattern[0].useV1Parser).toBeTruthy()
            expect(state.argPattern[0].useV2Parser).toBeFalsy()
            expect(state.argPattern[0].version).toBe('1.00')
            expect(state.argPattern[0].args.length).toBe(1)
            expect(state.argPattern[0].args[0]).toMatchObject(argDefinition)
        })

        it('version 2', () => {
            mapDefinition.versions = ['2.00']
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(1)
            expect(state.argPattern[0].useV1Parser).toBeFalsy()
            expect(state.argPattern[0].useV2Parser).toBeTruthy()
            expect(state.argPattern[0].version).toBe('2.00')
            expect(state.argPattern[0].args.length).toBe(1)
            expect(state.argPattern[0].args[0]).toMatchObject(argDefinition)
        })

        it('no argPatterns single versions', () => {
            mapDefinition.argPatterns = []
            mapDefinition.versions = ['2.02']
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(1)
            expect(state.argPattern[0].args.length).toBe(0)
            expect(state.argPattern[0].version).toBe('2.02')
        })

        it('single argPatterns single versions', () => {
            mapDefinition.argPatterns = ['Argument']
            mapDefinition.versions = ['2.02']
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(1)
            expect(state.argPattern[0].args.length).toBe(1)
            expect(state.argPattern[0].args[0].name).toBe('Argument')
            expect((state.args[0] as IArgument).last).toBeTruthy()
            expect(state.argPattern[0].args[0].last).toBeTruthy()
            expect(state.argPattern[0].version).toBe('2.02')
        })

        it('single argPatterns multi versions', () => {
            mapDefinition.argPatterns = ['Argument']
            mapDefinition.versions = ['1.00', '2.02']
            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(2)
            expect((state.args[0] as IArgument).last).toBeTruthy()

            // First pattern
            expect(state.argPattern[0].args.length).toBe(1)
            expect(state.argPattern[0].args[0].name).toBe('Argument')
            expect(state.argPattern[0].args[0].last).toBeTruthy()
            expect(state.argPattern[0].version).toBe('1.00')
            expect(state.argPattern[0].useV1Parser).toBeTruthy()
            expect(state.argPattern[0].useV2Parser).toBeFalsy()

            // Second pattern
            expect(state.argPattern[1].args.length).toBe(1)
            expect(state.argPattern[1].args[0].name).toBe('Argument')
            expect(state.argPattern[1].args[0].last).toBeTruthy()
            expect(state.argPattern[1].version).toBe('2.02')
            expect(state.argPattern[1].useV1Parser).toBeFalsy()
            expect(state.argPattern[1].useV2Parser).toBeTruthy()
        })

        it('multi argPatterns single versions', () => {
            const argDefs: IArgumentDefinition[] = [
                Object.assign({}, argDefinition),
                Object.assign({}, argDefinition)
            ]
            argDefs[0].name = 'arg1'
            argDefs[1].name = 'arg2'

            mapDefinition.args = argDefs
            mapDefinition.argPatterns = ['', 'arg1', 'arg1,arg2']
            mapDefinition.versions = ['1.00']

            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(3)
            expect((state.args[0] as IArgument).last).toBeFalsy()
            expect((state.args[1] as IArgument).last).toBeTruthy()

            // First pattern ()
            expect(state.argPattern[0].args.length).toBe(0)
            expect(state.argPattern[0].version).toBe('1.00')
            expect(state.argPattern[0].useV1Parser).toBeTruthy()
            expect(state.argPattern[0].useV2Parser).toBeFalsy()

            // Second pattern (arg1)
            expect(state.argPattern[1].args.length).toBe(1)
            expect(state.argPattern[1].args[0].name).toBe('arg1')
            expect(state.argPattern[1].args[0].last).toBeTruthy()
            expect(state.argPattern[1].version).toBe('1.00')
            expect(state.argPattern[1].useV1Parser).toBeTruthy()
            expect(state.argPattern[1].useV2Parser).toBeFalsy()

            // Third pattern (arg1,arg2)
            expect(state.argPattern[2].args.length).toBe(2)
            expect(state.argPattern[2].args[0].name).toBe('arg1')
            expect(state.argPattern[2].args[0].last).toBeFalsy()
            expect(state.argPattern[2].args[1].name).toBe('arg2')
            expect(state.argPattern[2].args[1].last).toBeTruthy()
            expect(state.argPattern[2].version).toBe('1.00')
            expect(state.argPattern[2].useV1Parser).toBeTruthy()
            expect(state.argPattern[2].useV2Parser).toBeFalsy()
        })

        it('multi argPatterns single versions with different order', () => {
            const argDefs: IArgumentDefinition[] = [
                Object.assign({}, argDefinition),
                Object.assign({}, argDefinition)
            ]
            argDefs[0].name = 'arg1'
            argDefs[1].name = 'arg2'

            mapDefinition.args = argDefs
            mapDefinition.argPatterns = ['', 'arg2, arg1', 'arg2']
            mapDefinition.versions = ['1.00']

            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(3)
            expect((state.args[0] as IArgument).last).toBeFalsy()
            expect((state.args[1] as IArgument).last).toBeTruthy()

            // First pattern ()
            expect(state.argPattern[0].args.length).toBe(0)
            expect(state.argPattern[0].version).toBe('1.00')
            expect(state.argPattern[0].useV1Parser).toBeTruthy()
            expect(state.argPattern[0].useV2Parser).toBeFalsy()

            // Second pattern (arg2,arg1)
            expect(state.argPattern[1].args.length).toBe(2)
            expect(state.argPattern[1].args[0].name).toBe('arg2')
            expect(state.argPattern[1].args[0].last).toBeFalsy()
            expect(state.argPattern[1].args[1].name).toBe('arg1')
            expect(state.argPattern[1].args[1].last).toBeTruthy()
            expect(state.argPattern[1].version).toBe('1.00')
            expect(state.argPattern[1].useV1Parser).toBeTruthy()
            expect(state.argPattern[1].useV2Parser).toBeFalsy()

            // Third pattern (arg2)
            expect(state.argPattern[2].args.length).toBe(1)
            expect(state.argPattern[2].args[0].name).toBe('arg2')
            expect(state.argPattern[2].args[0].last).toBeTruthy()
            expect(state.argPattern[2].version).toBe('1.00')
            expect(state.argPattern[2].useV1Parser).toBeTruthy()
            expect(state.argPattern[2].useV2Parser).toBeFalsy()
        })

        it('multi argPatterns multi versions', () => {
            const argDefs: IArgumentDefinition[] = [
                Object.assign({}, argDefinition),
                Object.assign({}, argDefinition)
            ]
            argDefs[0].name = 'arg1'
            argDefs[1].name = 'arg2'

            mapDefinition.args = argDefs
            mapDefinition.argPatterns = ['arg1', 'arg1, arg2']
            mapDefinition.versions = ['1.00', '2.02']

            const state = convertMapStatement(mapDefinition)
            expect(state.argPattern.length).toBe(4)
            expect((state.args[0] as IArgument).last).toBeFalsy()
            expect((state.args[1] as IArgument).last).toBeTruthy()

            // First pattern 1.00(arg1)
            const p1 = state.argPattern[0]
            expect(p1.version).toBe('1.00')
            expect(p1.useV1Parser).toBeTruthy()
            expect(p1.useV2Parser).toBeFalsy()
            expect(p1.args.length).toBe(1)
            expect(p1.args[0].name).toBe('arg1')
            expect(p1.args[0].last).toBeTruthy()

            // Second pattern 1.00(arg1, arg2)
            const p2 = state.argPattern[1]
            expect(p2.version).toBe('1.00')
            expect(p2.useV1Parser).toBeTruthy()
            expect(p2.useV2Parser).toBeFalsy()
            expect(p2.args.length).toBe(2)
            expect(p2.args[0].name).toBe('arg1')
            expect(p2.args[0].last).toBeFalsy()
            expect(p2.args[1].name).toBe('arg2')
            expect(p2.args[1].last).toBeTruthy()

            // Third pattern 2.02(arg1)
            const p3 = state.argPattern[2]
            expect(p3.version).toBe('2.02')
            expect(p3.useV1Parser).toBeFalsy()
            expect(p3.useV2Parser).toBeTruthy()
            expect(p3.args.length).toBe(1)
            expect(p3.args[0].name).toBe('arg1')
            expect(p3.args[0].last).toBeTruthy()

            // 4th pattern 2.02(arg1, arg2)
            const p4 = state.argPattern[3]
            expect(p4.version).toBe('2.02')
            expect(p4.useV1Parser).toBeFalsy()
            expect(p4.useV2Parser).toBeTruthy()
            expect(p4.args.length).toBe(2)
            expect(p4.args[0].name).toBe('arg1')
            expect(p4.args[0].last).toBeFalsy()
            expect(p4.args[1].name).toBe('arg2')
            expect(p4.args[1].last).toBeTruthy()
        })
    })
})
