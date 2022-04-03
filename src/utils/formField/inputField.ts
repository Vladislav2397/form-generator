import Vue from 'vue'

type InputField = {
    component?: string
    value: string,
    error: boolean,
    validRegex: RegExp,
    binding: Record<string, any>
}

export const inputModule = {
    inputFactory(props?: Partial<InputField>) {
        return Vue.observable<InputField>({
            component: 'input',
            value: props?.value ?? '',
            error: props?.error ?? false,
            validRegex: props?.validRegex ?? /.+/,
            binding: props?.binding ?? {},
        })
    },
    isValid(field: InputField) {
        return field.validRegex && field.validRegex.test(field.value)
    },
    isFilled(field: InputField) {
        return Boolean(field.value)
    },
    validateInputField(field: InputField) {
        if (field.validRegex) {
            field.error = !field.validRegex.test(field.value)
        }
    }
}

