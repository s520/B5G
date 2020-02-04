import { stringArgument } from '../../argument-types/string-argument'
import { assertSetIArgumentTestValue } from '../helper/assert-set-iargument-testvalue'
import { createEmptyArgument } from '../helper/empty-argument'

describe('String', () => {

    describe('isType()', () => {
        it('same type lower case', () => {
            expect(stringArgument.isType('string')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(stringArgument.isType('STRING')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(stringArgument.isType('String')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(stringArgument.isType(' string ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(stringArgument.isType('string?')).toBeTruthy()
        })
        it('different type', () => {
            expect(stringArgument.isType('double')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(stringArgument.isType('veryString')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('string value', () => {
            expect(stringArgument.bve5TestValue).toBe(`'${stringArgument.rowTestValue}'`)
        })
    })

    describe('csharpTestValue', () => {
        it('string charp value', () => {
            expect(stringArgument.csharpTestValue).toBe(`"${stringArgument.rowTestValue}"`)
        })
    })

    describe('setTestValue', () => {
        it('check set values', () => {
            assertSetIArgumentTestValue(stringArgument.setTestValue(createEmptyArgument()), stringArgument)
        })
    })
})
