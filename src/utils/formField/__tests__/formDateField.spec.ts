import FormDateField from "../formDateField"

describe('FormDateField class', () => {
    const form = new FormDateField({
        value: ['10.10.2010', '10.10.2010'],
        error: [false, false],
        validRegex: /\d{2}\.\d{2}\.\d{4}/,
        optionals: {
            label: 'label',
            placeholder: 'placeholder'
        }
    })

    test('default values', () => {
        expect(form.isValid().every(val => Boolean(val))).toBeTruthy()
    })

    test('custom values', () => {
        form.value = ['10.10.201', '10.10.010']
        expect(form.isValid().every(val => Boolean(val))).toBeFalsy()
    })

    test('error values', () => {
        expect(form.error).toBeFalsy()
    })
})
