import { sum } from '@/helpers'

test('sum default', () => {
    expect(
        sum(1, 1, 1)
    ).toEqual(3)

    expect(
        sum(2, -2, 0)
    ).toEqual(0)
})
