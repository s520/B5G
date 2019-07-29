import { createMapData } from '../../src/converter/createMapData'
import { IMapStatement } from '../../src/definition/iMapStatement';

describe('createMapData()', () => {
    let statement: IMapStatement

    beforeEach(() => {
        statement = {
            elem: 'Element',
            key: 'Key',
            sub_elem: 'SubElement',
            func: 'Function',
            versions: [],
            args: [],
            argPatterns: [],
            skip_test: false,
            argPattern: [],
            elem_lower: 'element',
            sub_elem_lower: 'subelement',
            func_lower: 'function',
            syntax1: false,
            syntax2: false,
            syntax3: true,
            nofunc: false,
            noarg: false
        }
    })

    it('single statement', () => {
        const mapData = createMapData([statement])
        expect(mapData.states.length).toBe(1)
        expect(mapData.states[0]).toMatchObject(statement)
        expect(mapData.elems.length).toBe(1)
        expect(mapData.elems[0]).toBe('Element')
        expect(mapData.subElems.length).toBe(1)
        expect(mapData.subElems[0]).toBe('SubElement')
        expect(mapData.funcs.length).toBe(1)
        expect(mapData.funcs[0]).toBe('Function')
    })

    it('multi statement', () => {
        const states = [
            Object.assign({}, statement),
            Object.assign({}, statement),
            Object.assign({}, statement)
        ]
        states[0].elem = 'Element1'
        states[1].elem = 'Element2'
        states[2].elem = 'Element3'
        states[0].sub_elem = 'SubElement1'
        states[1].sub_elem = 'SubElement2'
        states[2].sub_elem = 'SubElement3'
        states[0].func = 'Function1'
        states[1].func = 'Function2'
        states[2].func = 'Function3'

        const mapData = createMapData(states)
        expect(mapData.states.length).toBe(3)
        expect(mapData.states[0]).toMatchObject(states[0])
        expect(mapData.states[1]).toMatchObject(states[1])
        expect(mapData.states[2]).toMatchObject(states[2])
        expect(mapData.elems).toMatchObject(['Element1', 'Element2', 'Element3'])
        expect(mapData.subElems).toMatchObject(['SubElement1', 'SubElement2', 'SubElement3'])
        expect(mapData.funcs).toMatchObject(['Function1', 'Function2', 'Function3'])
    })
})
