import { getDafaultMapData } from '../src/defaultMapData'

describe('getDefaultMapData', () => {
    it('getMapData', async () => {
        const mapData = await getDafaultMapData()
        expect(mapData.states.length).toBe(76)
        expect(mapData.elems.length).toBe(27)
        expect(mapData.subElems.length).toBe(3)
        expect(mapData.funcs.length).toBe(36)
    })
})
