<template lang="pug">
    .b-divider(
        :class="classes"
    )
        span

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {DividerSize, DividerView} from "../../js/types/components/ui/divider"

@Component
export default class Divider extends Vue {
    @Prop({ default: 's' }) readonly size!: DividerSize
    @Prop({ default: 'base' }) readonly view!: DividerView
    @Prop() readonly vertical!: boolean
    @Prop({ default: true }) readonly round!: boolean

    get classes(): string[] {
        const classes = [`divider--size-${this.size}`, `divider--view-${this.view}`]

        if(this.vertical) {
            classes.push('divider--vertical')
        } else {
            classes.push('divider--horizontal')
        }

        if(this.round) {
            classes.push('divider--round')
        }

        return classes
    }
}

</script>
