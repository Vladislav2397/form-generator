import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Countable extends Vue {
    formFilledCount(form, excludes: string[] = []) {
        return Object
            .entries(form)
            .filter(
                ([fieldName]) => !excludes.includes(fieldName),
            )
            .reduce((total, [, field]) => total + +(this.isFieldFilled(field)), 0)
    }

    formFieldCount(form, excludes: string[] = []) {
        return Object.keys(form).length - excludes.length
    }

    isFieldFilled(field) {
        return Boolean(field.value.toString())
    }
}
