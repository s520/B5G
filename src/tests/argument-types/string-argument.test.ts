import { stringArgumentType } from '../../argument-types/string-argument-type'
import { assertSetISingleArgumentTestValue } from '../helper/assert-set-iargument-testvalue'
import { createEmptySingleArgument } from '../helper/empty-argument'

describe('String', () => {
    describe('isType()', () => {
        it('same type lower case', () => {
            expect(stringArgumentType.isType('string')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(stringArgumentType.isType('STRING')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(stringArgumentType.isType('String')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(stringArgumentType.isType(' string ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(stringArgumentType.isType('string?')).toBeTruthy()
        })
        it('different type', () => {
            expect(stringArgumentType.isType('double')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(stringArgumentType.isType('veryString')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('string value', () => {
            expect(stringArgumentType.bve5TestValue).toBe(
                `'${stringArgumentType.rowTestValue}'`
            )
        })
    })

    describe('csharpTestValue', () => {
        it('string charp value', () => {
            expect(stringArgumentType.csharpTestValue).toBe(
                `"${stringArgumentType.rowTestValue}"`
            )
        })
    })

    describe('setTestValue', () => {
        it('check set values', () => {
            assertSetISingleArgumentTestValue(
                stringArgumentType.setTestValue(createEmptySingleArgument()),
                stringArgumentType
            )
        })
    })
})
