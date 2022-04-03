import BaseFormField, { BaseFormFieldOptions } from './baseFormField'
import regulars from '../default/regulars'
import { Maybe } from '../../types/utils/other'

export interface FormMultipleFieldOptions extends BaseFormFieldOptions {
    value: Maybe<string>[]
    error: boolean[]
}

export default class FormMultipleField extends BaseFormField<FormMultipleFieldOptions> {
    constructor(props?: Partial<FormMultipleFieldOptions>) {
        const defaultValues = {
            value: ['', ''],
            error: [false, false],
            validRegex: regulars.notEmptyField,
            optionals: {},
        }

        super({ ...defaultValues, ...props })
    }

    isValid(): boolean[] {
        const isSuccessArray: boolean[] = []

        this.value?.forEach(val => {
            isSuccessArray.push(this.validRegex?.test(val ?? '') ?? false)
        })

        return isSuccessArray
    }

    isFilled() {
        return Boolean(this.value) ? this.value.map(val => Boolean(val)) ?? [] : [false]
    }
}
