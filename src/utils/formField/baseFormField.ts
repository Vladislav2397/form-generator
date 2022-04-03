export interface BaseFormFieldOptions {
    value: any
    error?: boolean | boolean[]
    validRegex: RegExp
    optionals: Record<string, any>
    loading?: boolean
}

export default abstract class BaseFormField<T extends BaseFormFieldOptions> {
    value: T['value']
    optionals: T['optionals']
    error: T['error']
    validRegex: T['validRegex']
    loading: T['loading']

    protected constructor(props: T) {
        this.value = props.value
        this.error = props.error
        this.optionals = props.optionals
        this.validRegex = props.validRegex
        this.loading = props.loading
    }

    abstract isValid(): boolean | boolean[]

    abstract isFilled(): boolean | boolean[]
}
