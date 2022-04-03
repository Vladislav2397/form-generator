<template lang="pug">
    .b-progress-bar(
        :class="classes"
    )
        .__description.skeleton-animation
            .__count(
                v-if="isShowStepCount"
            )
                skeleton-text-component(
                    size="s"
                )
            .__names
                .__name.is-bold
                    skeleton-text-component(
                        size="s"
                        :width-range="[0.2, 0.5]"
                    )
        .__steps
            .__step(
                v-for="step in sections"
                :style="{width}"
            )
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import progressBar from "../../../js/mixins/components/ui/progress-bar"
import SkeletonText from "./SkeletonText.vue";

export interface ISkeletonProgressBarProps  {
    sections: number
}

@Component({
    components: {
        'skeleton-text-component': SkeletonText
    }
})
export default class SkeletonProgressBar extends Mixins(progressBar) {
    @Prop() readonly sections!: ISkeletonProgressBarProps['sections']

    get width() {
        return this.sections > 1 ? `calc((100% - (0.333rem * ${this.sections - 1})) / ${this.sections})` : null
    }

    get isShowStepCount(){
        return !(this.$device.size.mobile || this.$device.size.tablet) && this.sections > 1
    }
}

</script>
