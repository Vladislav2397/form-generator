<template lang="pug">
    form-item-component.b-select(
        v-bind="formItemProps"
        v-on="$listeners"
        iconRight="chevron-down"
        cursor="pointer"
        :class="classes"
        :placeholder="selectedValueName"
        v-click-outside="hideOptions"
        @click="toggleShowOptions"
    )
        template(
            v-slot:tags="{ elementClass, blockClass }"
            v-if="isMulti && selectedMultiValues.length"
        )
            div(
                :class="elementClass"
                v-on:click.stop
            )
                tag-component(
                    v-for="(value,index) in selectedMultiValues"
                    :removable="index === 0"
                    :key="value.id"
                    :size="tagSize"
                    :class="`${blockClass}__tag`"
                    @remove="setValue(value.id, $event)"
                ) {{ value.text }}

        template(
            #options
        )
            transition(
                :name="optionsTransitionName"
            )
                card-component.__options(
                    v-if="showOptions && !isDisabled"
                    ref="options"
                    :class="[`select__options--${optionsPosition}`, {'is-active': showOptions}]"
                    :interactive="false"
                    size="m"
                )
                    .__head(
                        v-if="isSearch"
                        :class="{'is-bordered': showHeadBorder}"
                        v-on:click.stop
                    )
                        input-component.__input(
                            v-model="searchText"
                            placeholder="Поиск"
                            iconLeft="search"
                        )
                    transition-group.__scroller(
                        tag="div"
                        name="list-item-move"
                        ref="scroller"
                        :class="{'is-overscroll': searchedOptions.length > 5}"
                        :style="{height: scrollerHeight}"
                        v-on:scroll.native="onScrollOptions"
                    )
                        .__option.list-item-move(
                            v-for="option in searchedOptions"
                            ref="option"
                            :key="option.id"
                            :class="{'is-active':isActiveOption(option.id)}"
                            v-on:click="setValue(option.id, $event)"
                        )
                            checkbox-component.__checkbox(
                                v-if="isMulti"
                                :value="isActiveOption(option.id)"
                            )
                            .__text.-option {{ option.text }}
                            icon-base-component.__icon.-option(
                                v-if="!isMulti"
                                name="check"
                            )
</template>

<script lang="ts">
/* eslint-disable */
import {Component, Mixins, Prop, PropSync, Ref, VModel, Watch, Vue, Emit} from 'vue-property-decorator'

import formItem from '@/mixins/components/ui/form-item.vue'
import {SelectOption} from "@/types/components/ui/select";
import {onKeydown} from "@/utils/default/keydown";
import {Maybe} from "@/types/utils/other";
import FormItem from "@/components/ui/FormItem.vue";
import IconBase from "@/components/ui/icons/IconBase.vue"
import Card from "@/components/ui/Card.vue";

export type SelectProps = {
    value: SelectOption['id'] | SelectOption['id'][] | null,
    options: SelectOption[]
    active?: boolean
    search?: boolean | string
}

@Component({
    components: {
        'card-component': Card,
        'form-item-component': FormItem,
        'icon-base-component': IconBase,
    }
})
export default class Select extends Mixins(formItem) {
    @Prop({required: true}) readonly options!: SelectProps['options']
    @Prop({required: true}) readonly value!: SelectProps['value']
    @Prop() readonly search!: SelectProps['search']
    @PropSync('active', {default: false}) activeSync!: SelectProps['active']
    @VModel() valueModel!: SelectProps['value']
    @Ref('options') optionsRef!: Vue
    @Ref('option') optionRef!: HTMLElement
    @Ref('scroller') scrollerRef!: Vue

    @Emit('change')
    changeEmit() {
        return this.valueModel
    }

    searchText = ''
    showOptions = false
    showHeadBorder = false
    optionsPosition: 'top' | 'bottom' = 'bottom'
    scrollerHeight: Maybe<string> = null

    isActiveOption(id: SelectOption['id']) {
        return this.isMulti ? (this.value as SelectOption['id'][]).includes(id) : this.value === id
    }

    setValue(id: SelectOption['id'], event: MouseEvent) {
        if(this.isMulti){
            event.stopPropagation()
        }

        if(this.isMulti) {
            const prevValue = this.value as SelectOption['id'][]
            const selectedOptionIndex = prevValue.findIndex(option => option === id)
            this.valueModel = selectedOptionIndex === -1 ? [...prevValue, id] : prevValue.filter(option => option !== id)
        } else {
            this.valueModel = this.valueModel === id ? null : id
        }

        this.changeEmit()

        if (this.errorSync) {
            this.errorSync = false
        }
    }

    toggleShowOptions() {
        if(!this.isDisabled) {
            this.setShowOptions(!this.showOptions)
        }
    }

    hideOptions(){
        this.setShowOptions(false)
    }

    setShowOptions(value: boolean){
        this.showOptions = value
        this.activeSync = value
    }

    setOptionsPosition() {
        this.$nextTick(()=> {
            const el = this.optionsRef.$el
            const rect = el.getBoundingClientRect()
            this.optionsPosition = rect.bottom <= window.innerHeight ? 'bottom' : 'top'
        })
    }

    setShowHeaderBorder(value: boolean){
        this.showHeadBorder = value
    }

    // @ts-ignore
    onKeydown(e) {
        onKeydown(e,[
            {
                key: 'esc',
                callback: this.hideOptions
            },
            {
                key: 'enter',
                callback: this.hideOptions
            }
        ])
    }

    onScrollPage(){
        this.hideOptions()
    }

    onScrollOptions(e: Event) {
        const {
            target
        } = e


        this.setShowHeaderBorder((target as HTMLElement).scrollTop >= 8)
    }

    scrollToActiveOption() {
        this.$nextTick(() => {
            const scrollRefRectHeight = this.scrollerRef.$el.getBoundingClientRect().height
            let optionIndex = -1

            if(this.isMulti){
                const values = this.value as SelectOption['id'][]
                optionIndex = this.options.findIndex(option => values.includes(option.id))
            } else {
                optionIndex = this.options.findIndex(option => option.id === this.value);
            }

            if(~optionIndex) {
                // @ts-ignore
                const activeOption = this.optionRef[optionIndex]
                const activeOptionHeight = activeOption.getBoundingClientRect().height
                const activeOptionOffsetTop = activeOption.offsetTop

                if(activeOptionOffsetTop + activeOptionHeight >= scrollRefRectHeight) {
                    this.scrollerRef.$el.scrollTop = activeOptionOffsetTop + activeOptionHeight - scrollRefRectHeight
                }
            }

        })
    }

    setScrollHeight() {
        this.$nextTick(() => {
            if(this.isSearch) {
                this.scrollerHeight = `${this.scrollerRef.$el.getBoundingClientRect().height}px`
            }
        })
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeydown, {passive: true})
        document.addEventListener('scroll', this.onScrollPage, {passive: true})
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydown)
        document.removeEventListener('scroll', this.onScrollPage)
    }

    clear() {
        this.searchText = ''
        this.showHeadBorder = false
        this.optionsPosition = 'bottom'
        this.scrollerHeight = null
    }

    get searchedOptions(){
        return this.searchText && this.isSearch ? this.options.filter(option => option.text.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) : this.options
    }

    get isFilled() {
        return this.isMulti ? (this.value as SelectOption['id'][]).length : this.value !== null
    }

    get isMulti() {
        return Array.isArray(this.value)
    }

    get classes() {
        const classes: string[] = []

        if(this.isFilled) {
            classes.push('is-filled')
        }

        if(this.showOptions && !this.isDisabled) {
            classes.push('is-active')
        }

        return classes
    }


    get selectedValueName(){
        const valueName = !this.isMulti && this.value !== null ? this.options.find(option => option.id === this.value)?.text : null
        return valueName && !this.isMulti ? valueName : this.placeholder
    }

    get selectedMultiValues(){
        const values = (this.value as SelectOption['id'][]);
        const selectedOptions = this.options.filter(option => values.includes(option.id))
        if(selectedOptions.length) {

            const lastAddedValue = selectedOptions[selectedOptions.length - 1]

            if(selectedOptions.length === 1){
                return  [lastAddedValue]
            }

            // @ts-ignore
            return  [lastAddedValue, {text: `+${selectedOptions.length - 1}`, id: lastAddedValue.id + 1}]
        }

        return []

    }

    get optionsTransitionName() {
        return this.optionsPosition === 'bottom' ? 'fade-down' : 'fade-up'
    }

    get tagSize() {
        return this.size === 's' ? 's' : 'm'
    }

    get isSearch(){
        return typeof this.search !== 'undefined' && this.search !== false
    }

    get isDisabled(){
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    @Watch('showOptions')
    // @ts-ignore
    onChangeShowOptions(newValue){
        if(newValue && !this.isDisabled) {
            this.addEvents()
            this.setOptionsPosition()
            this.scrollToActiveOption()
            this.setScrollHeight()
        } else {
            this.removeEvents()
            this.clear()
        }
    }


    created(){
        this.showOptions = !!this.activeSync
    }

    beforeDestroy() {
        this.removeEvents()
    }

}

</script>
