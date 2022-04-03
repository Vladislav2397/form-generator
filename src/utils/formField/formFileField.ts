import regulars from '../default/regulars'
import BaseFormField, { BaseFormFieldOptions } from './baseFormField'
import { Maybe } from '../../types/utils/other'

export interface FormFileFieldOptions extends BaseFormFieldOptions {
    value: Maybe<number>
    error: boolean
    group: 'founder' | 'company' | 'bank'
}

export default class FormFileField extends BaseFormField<FormFileFieldOptions> {
    progress!: number | null
    errorText
    onUpload

    constructor(props?: Partial<FormFileFieldOptions>) {
        const defaultValues: FormFileFieldOptions = {
            value: null,
            error: false,
            group: 'bank',
            validRegex: regulars.numbers,
            optionals: {},
        }

        super({ ...defaultValues, ...props })

        this.progress = null
        this.errorText = 'Ошибка загрузки файла'

        // not work as class method
        this.onUpload = progressEvent => {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
    }

    abortLoading() {
        const abortController = new AbortController()

        console.log('abortLoading')
        abortController.abort()
        this.clear()
    }

    clear() {
        this.value = null
        this.progress = null
    }

    isValid(): boolean {
        return this.validRegex.test(this.value?.toString() ?? '')
    }

    isFilled(): boolean {
        return Boolean(this.value) ?? this.progress === 100
    }
}
