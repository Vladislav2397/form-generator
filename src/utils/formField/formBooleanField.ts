import BaseFormField, {BaseFormFieldOptions} from './baseFormField'

export interface FormBooleanFieldOptions extends BaseFormFieldOptions {
    value: boolean
}

export default class FormBooleanField extends BaseFormField<FormBooleanFieldOptions> {
    constructor(props?: Partial<FormBooleanFieldOptions>) {
        const defaultValues = {
            value: false,
            error: false,
            validRegex: /.*/,
            optionals: {} as FormBooleanFieldOptions['optionals'],
        }

        super({ ...defaultValues, ...props })
    }

    isValid() {
        return this.value
    }

    isFilled() {
        return true
    }

    validate(): void {
        this.error = !this.isValid()
    }
}
