import Vue from 'vue'

type InputMultiField = {
    value: [ string, string ],
    error: [ boolean, boolean ],
    validRegex: RegExp,
    binding: Record<string, any>
}

export const inputMultiFactory = (props?: Partial<InputMultiField>) => Vue.observable<InputMultiField>({
    value: props?.value ?? ['', ''],
    error: props?.error ?? [false, false],
    validRegex: props?.validRegex ?? /.+/,
    binding: props?.binding ?? {}
})

export const validateInputMultiField = (field: InputMultiField) => {
    if (field.validRegex) {
        field.error = field.value.map(
            val => !field.validRegex.test(val)
        )
    }
}
