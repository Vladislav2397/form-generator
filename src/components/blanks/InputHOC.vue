<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {CreateElement, VNode} from "vue"
import FormMultipleField from "../../js/utils/formField/formMultipleField"
import FormSingleField from "../../js/utils/formField/formSingleField"
import BaseFormField from "../../js/utils/formField/baseFormField"

@Component
export default class InputHOC extends Vue {
    @Prop() readonly component!: (
        BaseFormField<FormSingleField | FormMultipleField>
    ) & {
        optionals: { type: string }
    }

    render(h: CreateElement): VNode {
        return h(`${this.component.optionals.type}-component`, {
            props: {
                value: this.component.value,
                error: this.component.error,
                ...this.component instanceof FormSingleField && {
                    errorText: this.component.errorText,
                },
                ...this.component instanceof FormMultipleField && {
                    errors: this.component.error,
                },
                ...this.component.optionals,
                ...this.$attrs,
            },
            on: {
                ...this.$listeners,
                input: (event: string | string[]) => {
                    this.component.value = event

                    if(this.$listeners.input && !Array.isArray(this.$listeners.input)) {
                        this.$listeners.input(event)
                    }
                },
                'update:error': (event: boolean | boolean[]) => {
                    this.component.error = event
                },
                'update:errors': (event: boolean | boolean[]) => {
                    this.component.error = event
                },
            }
        })
    }
}
</script>
