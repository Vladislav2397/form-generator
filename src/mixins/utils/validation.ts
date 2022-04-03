import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Validation extends Vue {
    isFieldValid(field): boolean {
        return field.validRegex?.test(field.value) ?? true
    }
}
