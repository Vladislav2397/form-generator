import FormSingleField from "../formSingleField"

describe('FormSingleField class', () => {
    describe('default values', () => {
        const form = new FormSingleField()

        test('correct fields', () => {
            expect(form.value).toEqual('')
            expect(form.error).toEqual(false)
            expect(form.optionals).toEqual({})
            expect(form.validRegex).toEqual(/.*/)
            expect(form.isValid()).toBeTruthy()
            expect(form.errorText).toEqual(undefined)
            expect(form.isFilled()).toBeFalsy()
        })
    })
})

describe('formSingleField class', () => {
    const form = new FormSingleField({
        value: '',
        error: false,
        validRegex: /^\d{12}$/,
        optionals: {
            label: 'label',
            placeholder: 'placeholder'
        }
    }).setErrorText(() => 'Должно быть 12 чисел')

    test('correct fields', () => {
        expect(form.value).toEqual('')
        expect(form.error).toEqual(false)
        expect(form.optionals?.label).toEqual('label')
        expect(form.optionals?.placeholder).toEqual('placeholder')
    })

    test('correct validating', () => {
        form.value = '42'
        expect(form.value).toEqual('42')
        expect(form.isValid()).toBeFalsy()

        // @ts-ignore
        form.value = null
        expect(form.isValid()).toBeFalsy()
    })

    test('error crash', () => {
        form.value = '123456789011'
        expect(form.isValid()).toBeTruthy()
    })
})

describe('correct valid', () => {
    const form = new FormSingleField({
        value: 'some-val',
        error: false,
        validRegex: /\d+/,
    })

    test('default values', () => {
        expect(form.value).toBe('some-val')
        expect(form.error).toBeFalsy()
        expect(form.validRegex).toEqual(/\d+/)
    })

    test('values after valid', () => {
        form.isValid()

        expect(form.value).toBe('some-val')
        expect(form.error).toBeFalsy()
        expect(form.validRegex).toEqual(/\d+/)
    })
})
