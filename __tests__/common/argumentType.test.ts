import * as argType from '../../src/common/argumentTypes'

describe('DoubleArgument', () => {
    let double: argType.DoubleArgument

    beforeAll(() => {
        double = new argType.DoubleArgument()
    })

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

    describe('getOutputValue()', () => {
        it('double value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(double.getOutputValue())).toBeTruthy()
        })
    })

    describe('getCSharpTestValue()', () => {
        it('double csharp value', () => {
            const numberRegex = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/
            expect(numberRegex.test(double.getCSharpTestValue())).toBeTruthy()
        })
    })
})

describe('StringArgument', () => {
    let string: argType.StringArgument

    beforeAll(() => {
        string = new argType.StringArgument()
    })

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

    describe('getOutputValue()', () => {
        it('string value', () => {
            const outputValue = string.getOutputValue()
            expect(outputValue).toBe(`'${string.testValue}'`)
        })
    })

    describe('getCSharpTestValue()', () => {
        it('string charp value', () => {
            const csharpValue = string.getCSharpTestValue()
            expect(csharpValue).toBe(`"${string.testValue}"`)
        })
    })
})
