import FormSingleField from "../formSingleField"

describe('class.formSingleField.default after validate', () => {
    let correctForm
    let incorrectForm

    beforeEach(() => {
        correctForm = new FormSingleField({
            value: '123',
            validRegex: /^\d+$/
        })

        incorrectForm = new FormSingleField({
            value: '123s',
            validRegex: /^\d+$/
        })

        correctForm.validate()
        incorrectForm.validate()
    })

    test('is correctForm valid', () => {
        expect(correctForm.isValid()).toBeTruthy()
    })

    test('is incorrectForm valid', () => {
        expect(incorrectForm.isValid()).toBeFalsy()
    })

    test('correctForm error value', () => {
        expect(correctForm.error).toBeFalsy()
    })

    test('incorrectForm error value', () => {
        expect(incorrectForm.error).toBeTruthy()
    })
})

describe('class.formSingleField.default before validate', () => {
    const correctForm = new FormSingleField({
        value: '123',
        validRegex: /^\d+$/
    })

    const incorrectForm = new FormSingleField({
        value: '123s',
        validRegex: /^\d+$/
    })

    test('is correctForm valid', () => {
        expect(correctForm.isValid()).toBeTruthy()
    })

    test('is incorrectForm valid', () => {
        expect(incorrectForm.isValid()).toBeFalsy()
    })

    test('correctForm error value', () => {
        expect(correctForm.error).toBeFalsy()
    })

    test('incorrectForm error value', () => {
        expect(incorrectForm.error).toBeFalsy()
    })
})
