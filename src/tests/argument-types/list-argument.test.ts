import { listArgumentType } from '../../argument-types/list-argument-type'

describe('List', () => {
    describe('isType()', () => {
        it('same type lower case', () => {
            expect(listArgumentType.isType('list')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(listArgumentType.isType('LIST')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(listArgumentType.isType('List')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(listArgumentType.isType(' list ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(listArgumentType.isType('list?')).toBeTruthy()
        })
        it('different type', () => {
            expect(listArgumentType.isType('string')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(listArgumentType.isType('listList')).toBeFalsy()
        })
    })

    describe('rowTestValue', () => {
        it('returns dummy value', () => {
            expect(listArgumentType.rowTestValue).toBe('dummy')
        })
    })

    describe('bve5TestValue', () => {
        it('returns dummy value', () => {
            expect(listArgumentType.bve5TestValue).toBe('dummy')
        })
    })

    describe('csharpTestValue', () => {
        it('returns dummy value', () => {
            expect(listArgumentType.csharpTestValue).toBe('dummy')
        })
    })
})
