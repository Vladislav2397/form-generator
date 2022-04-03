import FormMultipleField from './formMultipleField'
import regulars from '../default/regulars'

export type FormFieldMultipleConstructor = {
    value?: string[]
    error?: boolean[]
    validRegex?: RegExp
    optionals?: Record<string, unknown>
}

export default class FormDateField extends FormMultipleField {
    constructor(
        props: FormFieldMultipleConstructor = {
            value: ['', ''],
            error: [false, false],
            validRegex: regulars.date,
            optionals: {
                placeholder: ['дд.мм.гггг', 'дд.мм.гггг'],
            },
        },
    ) {
        super(props)
    }
}
