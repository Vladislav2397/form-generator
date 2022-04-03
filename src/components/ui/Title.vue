<template lang="pug">
    component.b-title(
        :is="tag"
        :class="classes"
    )
        slot

</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {TitleSize, TitleTag, TitleView} from "../../js/types/components/ui/title";

export interface ITitleProps {
    size: TitleSize
    tag: TitleTag
    view: TitleView
}

@Component
export default class Title extends Vue {
    @Prop({default: 'm'})readonly size!: ITitleProps['size']
    @Prop({default: 'div'})readonly tag!: ITitleProps['tag']
    @Prop({default: 'base'})readonly view!: ITitleProps['view']

    get classes(){
        return [
            `title--size-${this.size}`,
            `title--view-${this.view}`
        ]
    }
}

</script>
