import { sum } from './helpers'

import BaseFormField, { BaseFormFieldOptions } from './baseFormField'
import FormMultipleField from './formMultipleField'

export default class FormContainer {
    public forms!: Record<string, BaseFormField<BaseFormFieldOptions>>
    private excludes!: (keyof FormContainer['forms'])[]
    public error!: boolean

    constructor(forms, excludes: FormContainer['excludes'] = []) {
        this.forms = forms
        this.excludes = excludes
        this.error = false
    }

    filled(): number {
        let count = 0

        this.asFilteredList().forEach(([, field]) => {
            const isFilled = field.isValid()

            if (field instanceof FormMultipleField) {
                count += sum(...(isFilled as boolean[]))
            } else {
                count += Number(isFilled)
            }
        })

        return count
    }

    fieldsCount() {
        const allValueCount = sum(
            ...this.asList().map(([, form]) => (typeof form.value === 'object' ? form.value?.length ?? 1 : 1)),
        )

        return allValueCount - this.excludes.length
    }

    validation() {
        let error = false
        this.asFilteredList().forEach(([, form]) => {
            if (form instanceof FormMultipleField) {
                form.error = form.isValid().map(val => !val)

                this.error = error || form.error[0] || form.error[1]
            } else {
                form.error = !form.isValid()

                this.error = error || form.error
            }
        })
    }

    clearError() {
        this.error = false
    }

    isValid() {
        return this.asFilteredList().every(([_, field]) => {
            return field.isValid()
        })
    }

    asList() {
        return Object.entries(this.forms)
    }

    asFilteredList() {
        const list = this.asList()

        if (this.excludes.length) {
            return list.filter(([name]) => !this.excludes.includes(name))
        }
        return list
    }
}
