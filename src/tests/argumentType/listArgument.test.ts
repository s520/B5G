import { listArgument } from '../../argument-types/list-argument'

describe('List', () => {

    describe('isType()', () => {
        it('same type lower case', () => {
            expect(listArgument.isType('list')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(listArgument.isType('LIST')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(listArgument.isType('List')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(listArgument.isType(' list ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(listArgument.isType('list?')).toBeTruthy()
        })
        it('different type', () => {
            expect(listArgument.isType('string')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(listArgument.isType('listList')).toBeFalsy()
        })
    })

    describe('rowTestValue', () => {
        it('returns dummy value', () => {
            expect(listArgument.rowTestValue).toBe('dummy')
        })
    })

    describe('bve5TestValue', () => {
        it('returns dummy value', () => {
            expect(listArgument.bve5TestValue).toBe('dummy')
        })
    })

    describe('csharpTestValue', () => {
        it('returns dummy value', () => {
            expect(listArgument.csharpTestValue).toBe('dummy')
        })
    })
})
