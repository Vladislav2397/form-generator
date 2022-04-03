<template lang="pug">
    .b-tabs
        .__wrapper
            .__toggle(
                :style="toggleStyles"
            )
            .__list
                button.__item(
                    ref="items"
                    v-for="tab in list"
                    :class="{'is-active': tab.id === valueModel}"
                    type="button"
                    role="button"
                    v-on:click="onClick(tab.id)"
                ) {{ tab.text }}
</template>

<script lang="ts">
import {Component, Prop, Ref, VModel, Vue} from 'vue-property-decorator'
import {TabOption} from "../../js/types/components/ui/tabs";

export interface ITabsProps {
    value: number
    list: TabOption[]
}

@Component
export default class Tabs extends Vue {
    @Prop() readonly list!: ITabsProps['list']
    @VModel() valueModel!: ITabsProps['value']

    @Ref('items') itemsRef!: HTMLElement[]


    toggleStyles = {
        width: null as null | string,
        transform: null as null | string
    }

    onClick(id: number){
        this.setValue(id)
        this.setToggleStyles(id)
    }

    setValue(id){
        this.valueModel = id
    }

    setToggleStyles(id: number) {
        const index = this.list.findIndex(item => item.id === id);
        const currentItem = this.itemsRef[index];
        const { width } = currentItem.getBoundingClientRect()
        const { offsetLeft } = currentItem

        this.toggleStyles = {
            width: `${width}px`,
            transform: `translate(${offsetLeft}px, 0)`
        }
    }

    mounted() {
        this.setToggleStyles(this.valueModel)
    }
}

</script>
