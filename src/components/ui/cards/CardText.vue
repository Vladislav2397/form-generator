<template lang="pug">
    card-component.b-card-text(
        :interactive="false"
    )
        title-component.__title(
            v-if="title"
            size="xxs"
        ) {{ title }}
        .__content(
            v-if="text"
        ) {{ text }}

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

export interface ICardTextProps {
    title?: string
    text?: string
}

@Component
export default class CardText extends Vue {
    @Prop() readonly title!: ICardTextProps['title']
    @Prop() readonly text!: ICardTextProps['text']
}

</script>
