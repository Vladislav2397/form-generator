import Vue from "vue"
import { zip } from "@/helpers"

export const createState = <
    Fields extends Record<string, StepField>
>(fields: Fields): Record<keyof Fields, Fields[keyof Fields]['value']> => {
    const keys: (keyof Fields)[] = Object.keys(fields)
    const values: StepField[] = Object.values(fields)

    return (Vue.observable(
        Object.fromEntries(
            zip(keys, values.map(item => item.value))
        )
    )) as Record<keyof Fields, Fields[keyof Fields]['value']>
}

export const createErrors = <
    Fields extends Record<string, StepField>
>(fields: Fields): Record<keyof Fields, Fields[keyof Fields]['error']> => {
    const keys: (keyof Fields)[] = Object.keys(fields)
    const values: StepField[] = Object.values(fields)

    return (Vue.observable(
        Object.fromEntries(
            zip(keys, values.map(item => item.error))
        )
    )) as Record<keyof Fields, Fields[keyof Fields]['error']>
}

export const createAppearance = <
    Fields extends Record<string, StepField>
>(fields: Fields) => {
    const keys: (keyof Fields)[] = Object.keys(fields)
    const values: StepField[] = Object.values(fields)

    return Object.fromEntries(
        zip(
            keys,
            values.map(
                item => ({
                    validRegex: item.validRegex,
                    component: item.component,
                    ...item.binding
                })
            )
        )
    ) as Record<
        keyof Fields,
        {
            validRegex: Fields[keyof Fields]['validRegex']
        } & Fields[keyof Fields]['binding']>
}

export const createBinding = <
    Fields extends Record<string, StepField>
>(fields: Fields) => {
    const keys: (keyof Fields)[] = Object.keys(fields)
    const values: StepField[] = Object.values(fields)

    return Object.fromEntries(
        zip(
            keys,
            values.map(val => ({ ...val.binding }))
        )
    )
}

interface Field {
    component: string
    validRegex?: RegExp
    binding?: Record<string, any>
}

export type StepField<Value = unknown, Error = unknown, Binding = Field['binding']> = {
    component: Field['component']
    value: Value
    error: Error
    validRegex: Field['validRegex']
    binding: Binding
}
