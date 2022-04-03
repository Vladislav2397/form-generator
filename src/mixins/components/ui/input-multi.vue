<script lang="ts">
import {Component, Prop, PropSync, VModel, Vue} from 'vue-property-decorator'
import {FormItemSize, FormItemView} from "@/types/components/ui/form-item"
import {InputMask, InputType} from "@/types/components/ui/input"
import {IconName} from "@/types/components/ui/icon"

export interface IInputMultiProps {
    value: [left: string, right: string]
    label: string
    description: string
    size: FormItemSize
    view: FormItemView
    type: InputType
    mask: InputMask
    placeholders: [string, string]
    errors: [boolean, boolean]
    errorTexts: [string, string]
    iconsRight: [IconName, IconName]
    iconsLeft: [IconName, IconName]
}

@Component
export default class InputMultiMixin extends Vue {
    @Prop() readonly value!: IInputMultiProps['value']
    @Prop() readonly label!: IInputMultiProps['label']
    @Prop() readonly description!: IInputMultiProps['description']
    @Prop({default: 'm'}) readonly size!: IInputMultiProps['size']
    @Prop({default: 'base'}) readonly view!: IInputMultiProps['view']
    @Prop({ default: 'text' }) readonly type!: IInputMultiProps['type']
    @Prop() readonly mask!: IInputMultiProps['mask']
    @Prop({default: () => ['', '']}) readonly placeholders!: IInputMultiProps['placeholders']
    @Prop({default: () => ['', '']}) readonly errorTexts!: IInputMultiProps['errorTexts']
    @Prop({default: () => ['', '']}) readonly iconsRight!: IInputMultiProps['iconsRight']
    @Prop({default: () => ['', '']}) readonly iconsLeft!: IInputMultiProps['iconsLeft']
    @PropSync('errors', {default: () => [false, false]}) errorsSync!: IInputMultiProps['errors']

    @VModel() valueModel!: IInputMultiProps['value']

    onInput(value: string, index: number) {

        if (this.value[index] !== value) {
            this.valueModel = index === 0
                ? [value, this.value[1]]
                : [this.value[0], value]
        }

        this.setErrorSync(index)
    }

    setErrorSync(index: number){
        this.errorsSync = index === 0
            ? [false, this.errorsSync[1]]
            : [this.errorsSync[0], false]
    }

    defaultOptions(index: number) {
        return {
            value: this.valueModel[index],
            placeholder: this.placeholders[index],
            error: this.errorsSync[index],
            size: this.size,
            view: this.view,
            mask: this.mask,
            type: this.type,
            iconRight: this.iconsRight[index],
            iconLeft: this.iconsLeft[index],
        }
    }

}

</script>
