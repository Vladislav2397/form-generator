/* eslint-disable */
import { fieldMap, fieldOptions } from './fieldMap'

export type FieldNames = keyof typeof fieldMap

type Value = string | number | boolean

type InputOption = {
    component: 'input' | 'radio'
    value: Value | Value[]
}

export interface InputType {
    component: 'input'
    value: string | number | string[]
    error: boolean
    validRegex: RegExp
    binding?: Record<string, any>
}

export type CheckboxType = {
    component: 'checkbox'
    value: boolean
    binding?: Record<string, any>
}

export type RadioType = {
    component: 'radio'
    value: number
    binding?: Record<string, any>
}

export interface SelectType {
    component: 'select'
    value: number
    error: boolean
    validRegex: RegExp
    binding?: Record<string, any>
}

export interface DatepickerType {
    component: 'input-datepicker'
    value: string
    error: boolean
    validRegex: RegExp
    binding?: Record<string, any>
}

export interface MultiDatepickerType {
    component: 'input-multi-datepicker',
    value: string[]
    error: boolean[]
    validRegex: RegExp
    binding: Record<string, any>
}

export type BaseField = {
    component: string,
    value: any,
    binding: Record<string, any>
    [fieldName: string]: any
}

type F<
    T = InputType | CheckboxType | RadioType | SelectType | DatepickerType | MultiDatepickerType
> = T

export type BaseFieldOptions = Partial<BaseField>

export type Field =
    | InputType
    | CheckboxType
    | RadioType
    | SelectType
    | DatepickerType
    | MultiDatepickerType

export type ValidateField = F<InputType | SelectType | DatepickerType | MultiDatepickerType>

export type FormFields = {
    [fieldName: string]: Field['value']
}

type makeFieldFunction = (props?: any) => {
    component: 'input' | 'radio',
    value: any,
    binding: Record<string, any>
    [prop: string]: any
}
//
// export const setFieldValue = (field: Field, value: Field['value']) => {
//     field.value = value
// }
//
// export const isFieldValid = (field: Field) => {
//     return field.validRegex.test(field?.value?.toString() ?? '')
// }
//
// export const validateField = (field: Field) => {
//     field.error = !isFieldValid(field)
// }

const omitObj = <O, K extends keyof O>(obj: O | undefined, fields: K[]): Omit<O, K> => {
    const copy = { ...obj } as O

    if (obj) {
        fields.forEach(
            field => { delete obj[field] }
        )
    }

    return copy
}

export const makeField: makeFieldFunction = (props) => {
    return {
        component: '',
        value: '',
        ...props,
        binding: {
            ...props.binding
        }
    }
}

const inputField = (props?: any) => {
    return {
        ...makeField({
            component: 'input',
            value: props?.value ?? '',
            ...omitObj(props ?? {}, ['value']),
        })
    }
}

export const fieldByName = (name: FieldNames, props?: Partial<BaseField>) => {
    // @ts-ignore
    const field: BaseField = fieldOptions[name]

    let defaults = {
        component: field.component,
        value: field.value,
        binding: {
            ...field.binding,
        }
    }

    if (field.component === 'radio') {
        defaults.value = props?.value ?? (
            field?.binding?.options.length &&
            field.binding.options[0]?.id
        ) ?? ''
    } else if (field.component === 'input-multi-datepicker') {
        defaults.value = props?.value ?? ['', '']
    }

    return inputField({
        component: defaults.component,
        // value: props?.value ?? defaults.value ?? '',
        ...omitObj(props, ['value']),
        binding: {
            ...defaults.binding,
            ...props?.binding,
        }
    })
}

export const fieldByNameWithKey =
    (name: FieldNames, props?: BaseFieldOptions) => ({ [name]: fieldByName(name, props) })

const firstnameField = (props?: BaseFieldOptions) => fieldByNameWithKey('firstname', props)
const lastnameField = (props?: BaseFieldOptions) => fieldByNameWithKey('lastname', props)
const thirdNameField = (props?: BaseFieldOptions) => fieldByNameWithKey('thirdName', props)

export const fullNameFields = () => ({
    ...firstnameField(),
    ...lastnameField(),
    ...thirdNameField(),
})

export const passportFields = () => ({
    ...fieldByNameWithKey('passportNumber'),
    ...fieldByNameWithKey('passportBirthday'),
    ...fieldByNameWithKey('passportPlace'),
    ...fieldByNameWithKey('passportDate'),
    ...fieldByNameWithKey('passportCode'),
    ...fieldByNameWithKey('passportCity'),
    ...fieldByNameWithKey('passportAddress'),
})

export class FieldService {
    static isValid<T extends ValidateField>(
        field: T
    ): T extends MultiDatepickerType ? boolean[] : boolean {
        if (Array.isArray(field.value)) {
            // @ts-ignore
            return [
                ...field.value.map(
                    val => field.validRegex.test(val?.toString() ?? '')
                )
            ]
        }
        // @ts-ignore
        return field.validRegex.test(field.value.toString() ?? '')
    }

    static validate<T extends ValidateField = ValidateField>(
        field: ValidateField
    ) {
        if (Array.isArray(field?.value)) {
            field.error = this.isValid(field).map(val => !val)
        } else {
            field.error = this.isValid(field)
        }
    }

    static setValue(field: Field, value: Field['value']) {
        field.value = value
    }

    static isMulti(field: Field) {
        return Array.isArray(field.value)
    }
}
