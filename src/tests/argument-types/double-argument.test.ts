import { doubleArgumentType } from '../../argument-types/double-argument-type'
import { createEmptySingleArgument } from '../helper/empty-argument'
import { assertSetISingleArgumentTestValue } from '../helper/assert-set-iargument-testvalue'

describe('Double', () => {
    describe('isType()', () => {
        it('same type lower case', () => {
            expect(doubleArgumentType.isType('double')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(doubleArgumentType.isType('DOUBLE')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(doubleArgumentType.isType('Double')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(doubleArgumentType.isType(' double ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(doubleArgumentType.isType('double?')).toBeTruthy()
        })
        it('different type', () => {
            expect(doubleArgumentType.isType('string')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(doubleArgumentType.isType('doubleDouble')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('double value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(
                numberRegex.test(doubleArgumentType.bve5TestValue)
            ).toBeTruthy()
        })
    })

    describe('csharpTestValue', () => {
        it('double csharp value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(
                numberRegex.test(doubleArgumentType.csharpTestValue)
            ).toBeTruthy()
        })
    })

    describe('setTestValue', () => {
        it('check set values', () => {
            assertSetISingleArgumentTestValue(
                doubleArgumentType.setTestValue(createEmptySingleArgument()),
                doubleArgumentType
            )
        })
    })
})
