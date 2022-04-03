import { makeGetter } from './helpers'
import BaseFormField, { BaseFormFieldOptions } from './baseFormField'
import regulars from '../default/regulars'
import { Maybe } from '../../types/utils/other'

export interface FormSingleFieldOptions extends BaseFormFieldOptions {
    value: Maybe<string | number>
    error: boolean
    errorText?: string
    errorTextCallback?: () => string
}

export default class FormSingleField extends BaseFormField<FormSingleFieldOptions> {
    errorText: FormSingleFieldOptions['errorText']

    constructor(props?: Partial<FormSingleFieldOptions>) {
        const defaultValues: FormSingleFieldOptions = {
            value: '',
            error: false,
            validRegex: regulars.notEmptyField,
            optionals: {} as FormSingleFieldOptions['optionals'],
        }

        super({ ...defaultValues, ...props })

        this.errorText = props?.errorText ?? this.errorTextCallback()

        if (props?.errorTextCallback) {
            Object.defineProperty(this, 'errorTextCallback', {
                value: props.errorTextCallback.bind(this),
            })
        }
    }

    isValid() {
        return Boolean(this.validRegex.test(this.value?.toString() ?? ''))
    }

    isFilled() {
        return Boolean(this.value)
    }

    validate(): void {
        this.computedErrorText()
        this.error = !this.isValid()
    }

    computedErrorText() {
        const errorText = this.errorTextCallback()

        if (errorText) {
            this.errorText = errorText
        }
    }

    /**
     * @deprecated
     * use setErrorTextCallback for better accessibility
     */
    setErrorText(errorText: () => string) {
        makeGetter(this, 'errorText', errorText)

        return this
    }

    errorTextCallback(): string | undefined {
        return undefined
    }

    setErrorTextCallback(errorTextCallback) {
        Object.defineProperty(this, 'errorTextCallback', {
            value: errorTextCallback,
        })

        return this
    }
}
