<template lang="pug">
    .b-sorting
        .__title(
            v-if="!hideTitle"
        ) {{ title }}
        .__options
            button.__option(
                v-for="option in options"
                :class="{'is-active': option.id === valueModel.id, 'is-reverse': valueModel.reverse}"
                type="button"
                role="button"
                v-on:click="onChange(option.id)"
            )
                p {{ option.name }}
                transition(
                    name="fade"
                    mode="out-in"
                )
                    icon-base-component(
                        v-if="option.id === valueModel.id"
                        :key="iconName"
                        :name="iconName"
                    )
</template>

<script lang="ts">
import {Component, Emit, Prop, VModel, Vue} from 'vue-property-decorator'
import {SortingOption, SortingValue} from "../../js/types/components/ui/sorting";

export interface ISortingProps {
    title?: string
    hideTitle?: boolean
    options: SortingOption[]
    value: SortingValue
}

@Component
export default class Sorting extends Vue {
    @Prop({default: 'Сортировать:'}) readonly title!: ISortingProps['title']
    @Prop({default: false}) readonly hideTitle!: ISortingProps['hideTitle']
    @Prop({required: true}) readonly options!: ISortingProps['options']

    @VModel() valueModel!: ISortingProps['value']

    @Emit()
    sort() {
        return this.valueModel
    }


    onChange(id: number){
        if(id === this.valueModel.id){
            this.valueModel = {
                ...this.valueModel,
                reverse: !this.valueModel.reverse
            }
        } else {
            this.valueModel = {
                ...this.valueModel,
                id
            }
        }

        this.sort()
    }

    get iconName(){
        return this.valueModel.reverse ? 'sorting-reverse' : 'sorting'
    }
}

</script>
