<template lang="pug">
    .b-input-multi(
        v-click-outside="hideDatepicker"
    )
        .__text.-label(
            v-if="label"
        ) {{ label }}
        .__content
            input-component.__value.-left(
                ref="input0"
                v-bind="defaultOptions(0)"
                :focus="focusInput === 0"
                iconRight="calendar"
                mask="date"
                @input="onInputDate($event, 0)"
                @focus="onFocusInput(0)"
                @blur="onBlurInput(0)"
            )
            input-component.__value.-right(
                ref="input1"
                v-bind="defaultOptions(1)"
                :focus="focusInput === 1"
                iconRight="calendar"
                mask="date"
                @input="onInputDate($event, 1)"
                @focus="onFocusInput(1)"
                @blur="onBlurInput(1)"
            )
            transition(
                name="fade-down"
            )
                date-picker.__datepicker(
                    v-if="datepickerActive"
                    ref="datepicker"
                    :style="datepickerStyle"
                    :value="valueDatepicker"
                    :format="'DD.MM.YYYY'"
                    valueType="format"
                    inline
                    @input="onChangeDate"
                )
        .__text.-description(
            v-if="description"
        ) {{ description }}

</template>

<script lang="ts">
/* eslint-disable */
import {Component, Mixins, Ref, Vue, Watch } from 'vue-property-decorator'
import inputMulti from '@/mixins/components/ui/input-multi.vue'
import datepicker from '@/mixins/components/ui/datepicker.vue'
import {Maybe} from "@/types/utils/other"
import Input from "@/components/ui/Input.vue"

@Component({
    components: {
        'input-component': Input
    }
})
export default class InputMultiDatepicker extends Mixins(inputMulti, datepicker) {
    // TODO Добавить логику на отсечение даты если есть максимальная и минимальная

    @Ref('input0') input0Ref!: Vue
    @Ref('input1') input1Ref!: Vue
    @Ref('datepicker') datepickerRef!: Vue

    focusInput: Maybe<number> = null
    datepickerStyle = {
        left: null as Maybe<string>
    }

    onChangeDate(date:string) {

        if(this.focusInput !== null){
            this.setErrorSync(this.focusInput)
        }

        if(this.focusInput === 0){
            this.valueModel = [date,this.valueModel[1]]

            if(!this.valueModel[1]) {
                this.$nextTick(() => {
                    this.onFocusInput(1)
                })
            } else {
                this.hideDatepicker()
            }
        }

        if(this.focusInput === 1){
            this.valueModel = [this.valueModel[0],date]

            if(!this.valueModel[0]) {
                this.$nextTick(() => {
                    this.onFocusInput(0)
                })
            } else {
                this.hideDatepicker()
            }
        }

    }

    onFocusInput(value: Maybe<number>){
        this.setFocusInput(value)
        this.setDatepickerStyle(value)
        this.showDatepicker()
    }

    onBlurInput(index: number){
        // @ts-ignore
        const input = this[`input${index}Ref`].$el.querySelector('input');

        if(input.value !== this.valueModel[index]){
            input.value = this.valueModel[index]
        }
    }

    setFocusInput(value: Maybe<number>){
        this.focusInput = value
    }

    setDatepickerStyle(value: Maybe<number>){
        let offset = '0px'

        if(value === 1){
            const inputEl = this.input1Ref.$el as HTMLElement
            const inputElRect = inputEl.getBoundingClientRect()
            const datepickerWidth =  this.datepickerRef ? this.datepickerRef.$el.getBoundingClientRect().width : 0

            if(inputElRect.left + datepickerWidth < window.innerWidth){
                offset = `${inputEl.offsetLeft}px`
            } else {
                offset = `${inputEl.offsetLeft - datepickerWidth + inputElRect.width}px`
            }
        }
        this.datepickerStyle.left = offset
    }

    // @ts-ignore
    onInputDate(value, index) {
        if(value.length === 10 || value.length === 0) {
            this.onInput(value, index)
        }
    }

    get valueDatepicker() {
        return this.focusInput !== null ? this.valueModel[this.focusInput] : ''
    }

    @Watch('datepickerActive')
    // @ts-ignore
    onChangeDatepickerActive(newValue){
        if(!newValue){
            this.setFocusInput(null)
            if(document.activeElement && (document.activeElement as HTMLInputElement).blur) {
                (document.activeElement as HTMLInputElement).blur()
            }
        }
    }

}

</script>
