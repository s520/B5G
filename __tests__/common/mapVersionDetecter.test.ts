import { isMapVersion1, isMapVersion2 } from '../../src/common/mapVersionDetector'

describe('isMapVersion1', () => {
    it('is version 1', () => {
        expect(isMapVersion1('1.00')).toBeTruthy()
    })
    it('is version 1 with space', () => {
        expect(isMapVersion1(' 1.00 ')).toBeTruthy()
    })
    it('is version 1 minor', () => {
        expect(isMapVersion1('1.45')).toBeTruthy()
    })
    it('is not version 1', () => {
        expect(isMapVersion1('2.00')).toBeFalsy()
    })
    it('is not version string', () => {
        expect(isMapVersion1('version')).toBeFalsy()
    })
    it('empty version', () => {
        expect(isMapVersion1('')).toBeFalsy()
    })
})

describe('isMapVersion2', () => {
    it('is version 2', () => {
        expect(isMapVersion2('2.00')).toBeTruthy()
    })
    it('is version 2 with space', () => {
        expect(isMapVersion2(' 2.00 ')).toBeTruthy()
    })
    it('is version 2 minor', () => {
        expect(isMapVersion2('2.02')).toBeTruthy()
    })
    it('is not version 2', () => {
        expect(isMapVersion2('1.00')).toBeFalsy()
    })
    it('is not version string', () => {
        expect(isMapVersion2('version')).toBeFalsy()
    })
    it('empty version', () => {
        expect(isMapVersion2('')).toBeFalsy()
    })
})
