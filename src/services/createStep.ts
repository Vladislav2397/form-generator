import Vue from "vue"
import { zip } from "@/helpers"

const createState = <
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

const createErrors = <
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

interface StepAppearance<T extends Record<string, unknown>> {
    [p: keyof T]: Field
}

export default class Step<Fields extends Record<string, StepField>> {
    state: Record<keyof Fields, Fields[keyof Fields]['value']>
    errors: Record<keyof Fields, Fields[keyof Fields]['error']>
    // appearance: StepAppearance<Fields>

    constructor(fields: Fields) {
        this.state = createState(fields)
        this.errors = createErrors(fields)
    }
}