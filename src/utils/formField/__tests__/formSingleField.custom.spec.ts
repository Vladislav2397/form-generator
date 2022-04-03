import FormSingleField from "../formSingleField"

describe('class.formSingleField.isFilled', () => {
    let filledForm
    let unfilledForm

    beforeEach(() => {
        filledForm = new FormSingleField({
            value: '123',
            validRegex: /^\d+$/
        })

        unfilledForm = new FormSingleField({
            value: '',
            validRegex: /^\d+$/
        })
    })

    test('is filledForm', () => {
        expect(filledForm.isFilled()).toBeTruthy()
    })

    test('is unfilledForm', () => {
        expect(unfilledForm.isFilled()).toBeFalsy()
    })
})
