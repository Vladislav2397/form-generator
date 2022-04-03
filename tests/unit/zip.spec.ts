import { zip } from '@/helpers'

test('zip default', () => {
    const arr1 = ['a1', 'a2', 'a3']
    const arr2 = ['b1', 'b2', 'b3']

    expect(zip(arr1, arr2)).toStrictEqual([
        ['a1', 'b1'],
        ['a2', 'b2'],
        ['a3', 'b3'],
    ])
})

test('zip with different length', () => {
    const arr1 = ['a1', 'a2', 'a3', 'a4']
    const arr2 = ['b1', 'b2', 'b3']

    expect(zip(arr1, arr2)).toStrictEqual([
        ['a1', 'b1'],
        ['a2', 'b2'],
        ['a3', 'b3'],
    ])
})