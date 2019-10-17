import { doubleArgument } from '../../src/argumentTypes/doubleArgument'
import { stringArgument } from '../../src/argumentTypes/stringArgument'

describe('Double', () => {

    describe('isType()', () => {
        it('same type lower case', () => {
            expect(doubleArgument.isType('double')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(doubleArgument.isType('DOUBLE')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(doubleArgument.isType('Double')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(doubleArgument.isType(' double ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(doubleArgument.isType('double?')).toBeTruthy()
        })
        it('different type', () => {
            expect(doubleArgument.isType('string')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(doubleArgument.isType('doubleDouble')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('double value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(doubleArgument.bve5TestValue)).toBeTruthy()
        })
    })

    describe('csharpTestValue', () => {
        it('double csharp value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(doubleArgument.csharpTestValue)).toBeTruthy()
        })
    })
})

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
})
