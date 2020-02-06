import { getType } from '../../argument-types/all-types'
import { stringArgument } from '../../argument-types/string-argument'

describe('getType()', () => {
    it('valid type', () => {
        expect(getType(stringArgument.type)).toBe(stringArgument)
    })
    it('invalid type', () => {
        expect(getType('invalid type')).toBeUndefined()
    })
})
