<template lang="pug">
    component.b-skeleton-text(
        :is="tag"
        ref="skeleton"
        :style="{width}"
        :class="[`skeleton-text--view-${this.view}`, `skeleton-text--size-${this.size }` ]"
    )
        span
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import {SkeletonView, SkeletonSize, SkeletonTag} from "../../../js/types/components/ui/skeletons/skeleton-text"
import {Maybe} from "../../../js/types/utils/other"
import getStyle from "../../../js/utils/default/getStyle"

export interface ISkeletonTextProps {
    tag?: SkeletonTag,
    view?: SkeletonView
    size?: SkeletonSize
    widthRange?: [number, number]
}

@Component
export default class SkeletonText extends Vue {
    @Prop({
        default: 'div'
    }) tag!: ISkeletonTextProps['tag']
    @Prop({
        default: 'base'
    }) view!: ISkeletonTextProps['view']
    @Prop({
        default: 'm'
    }) size!: ISkeletonTextProps['size']
    @Prop() widthRange!: ISkeletonTextProps['widthRange']

    @Ref('skeleton') skeletonRef!: HTMLDivElement

    width: Maybe<string> = null

    mounted(){
        this.setWidth()
    }

    setWidth(){
        if (this.widthRange && this.widthRange[0] && this.widthRange[1]) {
            const width = getStyle(this.skeletonRef, 'max-width')

            const percents = ~width.indexOf('%') ? parseInt(width.replace('%', ''), 10) : 100
            const random = parseFloat((Math.abs(this.widthRange[1] - this.widthRange[0]) * Math.random() * 100).toFixed(2))
            const maxWidth = (this.widthRange[0] >= this.widthRange[1] ? this.widthRange[0] : this.widthRange[1]) * 100
            this.width =  `${(maxWidth - random)*percents/100}%`
        }
    }
}

</script>
