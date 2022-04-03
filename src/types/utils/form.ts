import { Maybe } from './other'

export type FormField = {
    value: Maybe<string | number>
    required?: boolean
    error?: boolean
    validRegex?: RegExp
    label?: string | number
    placeholder?: string | number
    errorText?: string | number
    list?: any[]
}

export type Document = {
    value: Maybe<string | number>
    error?: boolean
    group: 'founder' | 'company' | 'bank'
    title: string
    progress?: Maybe<number>

    context?:
        | null
        | {
              type?: string
              fileName?: string
          }
        | Record<string, unknown>
}
