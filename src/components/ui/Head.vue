<template lang="pug">
    .b-head
        title-component.__title(
            :tag="tag"
        ) {{ title }}
        .__buttons(
            v-if="buttons && buttons.length"
        )
            button-component(
                v-for="(button,index) in buttons"
                :key="index"
                :view="button.view"
                :aria-label="button.text"
                @click="button.callback"
            ) {{ button.text }}


</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ButtonItem} from "../../js/types/utils/other";


export interface IHeadProps {
    title: string
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div'
    buttons: ButtonItem[]
}

@Component
export default class Head extends Vue {
    @Prop({required: true}) readonly title!: IHeadProps['title']
    @Prop({default: 'h1'}) readonly tag!: IHeadProps['tag']
    @Prop() readonly buttons!: IHeadProps['buttons']
}

</script>
