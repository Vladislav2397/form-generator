<script lang="ts">
import { Component, PropSync, Prop, Vue } from 'vue-property-decorator'

import { IFormItemProps } from "@/components/ui/FormItem.vue"

@Component
export default class FormItemMixin extends Vue {
    @Prop({default: 'm'}) readonly size!: IFormItemProps['size']
    @Prop({default: 'base'}) readonly view!: IFormItemProps['view']
    @Prop({default: 'default'}) readonly cursor!: IFormItemProps['cursor']
    @Prop() readonly description!: IFormItemProps['description']
    @Prop() readonly placeholder!: IFormItemProps['placeholder']
    @Prop() readonly label!: IFormItemProps['label']
    @Prop() readonly disabled!: IFormItemProps['disabled']
    @Prop() readonly errorText!: IFormItemProps['errorText']
    @Prop() readonly iconLeft!: IFormItemProps['iconLeft']
    @Prop() readonly iconRight!: IFormItemProps['iconRight']
    @Prop() readonly loading!: IFormItemProps['loading']
    @Prop({default: 'div'}) readonly tag!: IFormItemProps['tag']

    @PropSync('error') errorSync!: IFormItemProps['error']

    get formItemProps() {
        return {
            size: this.size,
            view: this.view,
            cursor: this.cursor,
            description: this.description,
            placeholder: this.placeholder,
            label: this.label,
            disabled: this.disabled,
            errorText: this.errorText,
            iconLeft: this.iconLeft,
            iconRight: this.iconRight,
            tag: this.tag,
            error: this.errorSync,
            loading: this.loading
        }
    }

    get formItemListeners(){
        return {
            ...this.$listeners.click,
            ...this.$listeners.clickIcon && {
                clickIcon: this.$listeners.clickIcon
            }
        }
    }
}

</script>
