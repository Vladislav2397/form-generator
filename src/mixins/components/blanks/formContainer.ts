import { Component, Vue } from "vue-property-decorator"

// InWorks

export type FormFieldItem = {
    value: string
    error: boolean
    validRegex: RegExp
}

export interface FormContainerMixin {
    form: Record<string, FormFieldItem>
    excludes: (keyof FormContainer['form'])[]
}

@Component
export default class FormContainer extends Vue {
    form!: Record<string, FormFieldItem>
    excludes: (keyof FormContainer['form'])[] = []

    isValid(formField: FormFieldItem) {
        console.log('FormContainer.isValid')

        return Boolean(formField.value.match(formField.validRegex)?.length)
    }

    isFilled(formField: FormFieldItem) {
        console.log('FormContainer.isFilled')

        return Boolean(formField.value)
    }

    correctForm() {
        const form = Object.entries(this.form)

        if (this.excludes.length) {
            return form.filter(([key]) => this.excludes.includes(key))
        }

        return form
    }

    validate() {
        console.log('FormContainer.validate')

        this.correctForm().forEach(([, formItem]) => {
            const isValidForm = this.isValid(formItem)

            console.log(isValidForm)

            // formItem.error = !isValidForm
            //
            // if (formItem?.errorTextCallback) {
            //     formItem.errorText = formItem.errorTextCallback()
            // }
        })
    }
}
