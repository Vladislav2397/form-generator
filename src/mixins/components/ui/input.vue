<script lang="ts">
import {Component, VModel, Prop, Ref, Mixins, Vue} from 'vue-property-decorator'
import {InputMask, InputType} from "@/types/components/ui/input"
import formItem from './form-item.vue'

import { maskOptions } from '@/utils/service/dataConverters'
import linkify from "@/utils/default/linkify"
import { toNumberDecimal } from "@/utils/default/regulars"
import copyToBuffer from "@/mixins/utils/copyToBuffer"

export interface IInputProps {
    value: string
    type: InputType
    name: string
    mask: InputMask
    focus: boolean
    clearable: boolean | string
}

@Component
export default class InputMixin extends Mixins(formItem, copyToBuffer) {
    // TODO Fix mask input from `none` to null

    @VModel() valueModel!: string

    @Prop({ default: 'text' }) readonly type!: IInputProps['type']
    @Prop() readonly mask!: IInputProps['mask']
    @Prop() readonly value!: IInputProps['value']
    @Prop() readonly name!: IInputProps['name']
    @Prop() readonly focus!: IInputProps['focus']
    @Prop() readonly clearable!: IInputProps['clearable']

    @Ref('input') readonly inputRef!: HTMLInputElement | Element |  Vue

    isCleaveActualized = false
    updateKey = 1

    onBlurMask(event: InputEvent){
        if(this.mask === 'phone' && this.value.length <= 3) {
            this.valueModel = '';
            ((this.inputRef as Vue).$el as HTMLInputElement).value = ''
        }

        if(this.mask === 'decimal' && this.value && !~this.value.toString().indexOf(',')){
            this.$emit('input', toNumberDecimal(this.value))
        }

        this.$emit('blur', event)
    }

    onInput() {
        console.log('input')
        if (this.errorSync) {
            this.errorSync = false
        }
    }

    onInputCleave(value: string){
        if(this.isCleaveActualized) {
            if(this.mask === 'phone' && value.length === 4 && value[3] === '8'){
                ((this.inputRef as Vue).$el as HTMLInputElement).value = `${maskOptions.phone.prefix} `
                this.valueModel = `${maskOptions.phone.prefix} `
                this.onInput()
            } else if(value !== this.value){
                this.valueModel = value
                this.onInput()
            }
        }
    }

    getElementClasses(elementClass){
        const classes = [elementClass]

        if(this.focus) {
            classes.push('is-focus')
        }

        return classes
    }

    clear() {
        this.valueModel = ''
        this.errorSync = false
    }

    actualizationCleaveValue(){
        // Логика для инпута с маской телефона и decimal
        if (this.activeMask) {
            const cleaveElement = ((this.inputRef as Vue).$el as HTMLInputElement);

            // Фикс маски телефона, что бы, если есть валью в нем нне отсекались первые цифры
            if (cleaveElement.value !== this.value) {
                cleaveElement.value = this.value
            }
            // Фикс маски decimal, что бы всегда числа закачинвалиь на ,##
            if(this.mask === 'decimal' && this.value && this.value.toString()) {
                this.$nextTick(() => {
                    cleaveElement.value = toNumberDecimal(this.value)
                })
            }
        }

        this.$nextTick(() => {
            this.isCleaveActualized = true
        })
    }

    copy(){
        this.copyToBuffer(this.value)
    }

    get defaultOptions() {
        return {
            type: this.type,
            disabled: this.disabled,
            placeholder: this.placeholder,
            name: this.name,
            autocomplete: this.name || 'autocomplete'
        }
    }

    get formItemExtendedProps(){
        return {
            ...this.formItemProps,
            ...this.isClearable && this.valueModel && {
                iconRight: 'close'
            },
            ...this.isValueLinkify && {
                iconRight: 'copy'
            }
        }
    }

    get formItemExtendedListeners(){
        return {
            ...this.formItemListeners,
            ...this.isClearable && {
                clickIcon: this.clear
            },
            ...this.isValueLinkify && {
                clickIcon: this.copy
            }
        }
    }


    get isClearable(){
        return typeof this.clearable !== 'undefined' && this.clearable !== false
    }

    get activeMask(){
        return this.maskOptions[this.mask]
    }

    get isValueLinkify(){
        return linkify(this.valueModel)
    }

    mounted(){
        this.actualizationCleaveValue()
    }

    maskOptions = maskOptions
}

</script>
