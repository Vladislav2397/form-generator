import FormSingleField from "../formSingleField"
import FormContainer from "../formContainer"

describe('formSingleField class', () => {
    const container = new FormContainer({
        first: new FormSingleField({
            value: '123456789011',
            error: false,
            validRegex: /^\d{12}$/,
            optionals: {
                label: 'label',
                placeholder: 'placeholder'
            }
        }).setErrorText(() => 'Должно быть 12 чисел'),
        second: new FormSingleField({
            value: '',
            optionals: {
                label: 'Тип банковской гарантии',
                placeholder: 'Выберите тип',
                type: 'select',
                options: [
                    {
                        id: 1,
                        text: 'some'
                    },
                    {
                        id: 2,
                        text: 'values',
                    },
                    {
                        id: 3,
                        text: 'into'
                    },
                    {
                        id: 4,
                        text: 'select',
                    },
                ]
            },
        }),
    })

    test('first fields', () => {
        const first = container.forms.first

        expect(first.value).toEqual('123456789011')
        expect(first.error).toEqual(false)
        expect(first.validRegex).toEqual(/^\d{12}$/)
    })

    test('second fields', () => {
        const second = container.forms.second

        expect(second.value).toEqual('')
        expect(second.error).toEqual(false)
        expect(second.validRegex).toEqual(/.*/)
    })

    test('correct forms', () => {
        container.validation()

        expect(container.forms.first.error).toBeFalsy()

        expect(container.forms.second.value).toEqual('')
        expect(container.forms.second.validRegex).toEqual(/.*/)
        expect(container.forms.second.error).toBeFalsy()
    })
})
