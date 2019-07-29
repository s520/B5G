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
})
