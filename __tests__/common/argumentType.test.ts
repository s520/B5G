import { ArgumentType } from '../../src/common/argumentTypes'

describe('Double', () => {
    const double = ArgumentType.double

    describe('isType()', () => {
        it('same type lower case', () => {
            expect(double.isType('double')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(double.isType('DOUBLE')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(double.isType('Double')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(double.isType(' double ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(double.isType('double?')).toBeTruthy()
        })
        it('different type', () => {
            expect(double.isType('string')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(double.isType('doubleDouble')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('double value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(double.bve5TestValue)).toBeTruthy()
        })
    })

    describe('csharpTestValue', () => {
        it('double csharp value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(double.csharpTestValue)).toBeTruthy()
        })
    })
})

describe('String', () => {
    const string = ArgumentType.string

    describe('isType()', () => {
        it('same type lower case', () => {
            expect(string.isType('string')).toBeTruthy()
        })
        it('same type upper case', () => {
            expect(string.isType('STRING')).toBeTruthy()
        })
        it('same type pascal case', () => {
            expect(string.isType('String')).toBeTruthy()
        })
        it('same type with space', () => {
            expect(string.isType(' string ')).toBeTruthy()
        })
        it('same type optional', () => {
            expect(string.isType('string?')).toBeTruthy()
        })
        it('different type', () => {
            expect(string.isType('double')).toBeFalsy()
        })
        it('different type but contains type', () => {
            expect(string.isType('veryString')).toBeFalsy()
        })
    })

    describe('bve5TestValue', () => {
        it('string value', () => {
            expect(string.bve5TestValue).toBe(`'${string.rowTestValue}'`)
        })
    })

    describe('csharpTestValue', () => {
        it('string charp value', () => {
            expect(string.csharpTestValue).toBe(`"${string.rowTestValue}"`)
        })
    })
})
