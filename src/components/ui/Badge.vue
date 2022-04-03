<template lang="pug">
    .b-badge(
        :class="classes"
    )
        indicator-component(
            v-if="showIndicator"
            class="badge__indicator"
            :view="view"
        )
        slot

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import { BadgeSize, BadgeView} from "../../js/types/components/ui/badge";

export interface IBadgeProps {
    view: BadgeView
    size: BadgeSize
    showIndicator: boolean
}

@Component
export default class Badge extends Vue {
    @Prop({ default: 'm' }) readonly size!: IBadgeProps['size']
    @Prop({ default: 'system' }) readonly view!: IBadgeProps['view']
    @Prop({ default: true }) readonly showIndicator!: IBadgeProps['showIndicator']

    get classes(): string[] {
        const classes = [
            `badge--size-${this.size}`,
            `badge--view-${this.view}`,
        ]

        if(this.showIndicator) {
            classes.push('badge--indicator')
        }

        return classes;
    }
}

</script>
