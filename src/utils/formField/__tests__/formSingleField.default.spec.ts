import FormSingleField from "../formSingleField"

describe('class.formSingleField.default', () => {
    const form = new FormSingleField()

    test('correct fields', () => {
        expect(form.value).toEqual('')
        expect(form.error).toEqual(false)
        expect(form.optionals).toEqual(undefined)
        expect(form.validRegex).toEqual(/.*/)
    })
})
