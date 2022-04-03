<template lang="pug">
    .b-radio-toggle(
        :class="classes"
    )
        span
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {RadioToggleSize} from "../../js/types/components/ui/radio-toggle";

export type RadioToggleProps = {
    checked?: boolean
    size?: RadioToggleSize
}

@Component
export default class RadioToggle extends Vue {
    @Prop({default: false}) readonly checked!: RadioToggleProps['checked']
    @Prop({default: 'm'}) readonly size!: RadioToggleProps['size']


    get classes() {
        const classes = [`radio-toggle--size-${this.size}`]

        if(this.checked){
            classes.push('is-checked')
        }

        return classes
    }
}

</script>
