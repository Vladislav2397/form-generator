import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalOrderCreateStep extends Vue {
    // TODO: Common logic for steps

    validateField(field) {
        if (field.component === 'input-multi-datepicker') {
            if (field.validRegex) {
                // eslint-disable-next-line no-param-reassign
                field.error = [
                    !field.validRegex.test(field.value[0]),
                    !field.validRegex.test(field.value[1]),
                ]
            }
        } else if (field.validRegex) {
            // eslint-disable-next-line no-param-reassign
            field.error = !field.validRegex.test(field.value ?? '')
        }
    }

    isFieldValid(field) {
        if (field.component === 'input-multi-datepicker') {
            return [
                field.validRegex?.test(field.value[0]),
                field.validRegex?.test(field.value[1]),
            ]
        }

        return field.validRegex?.test(field.value) ?? true
    }

    isFieldFilled(field) {
        if (field.component === 'input-multi-datepicker') {
            return [ ...field.value.map(val => !!val) ]
        }

        return Boolean(field?.value)
    }
}
