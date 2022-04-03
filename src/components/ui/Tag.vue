<template lang="pug">
    .b-tag(
        :class="classes"
        v-on:click="remove"
    )
        .__value
            slot
        icon-base-component.__icon(
            v-if="this.isRemovable"
            name="close"
        )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {TagSize} from "../../js/types/components/ui/tag";

export interface ITagProps {
    disabled?: boolean | string
    removable?: boolean | string
    size?: TagSize
}

@Component
export default class Tag extends Vue {
    @Prop() readonly disabled!: ITagProps['disabled']
    @Prop() readonly removable!: ITagProps['removable']
    @Prop({default: 'm'}) readonly size!: ITagProps['size']

    remove(event: MouseEvent){
        if(this.isRemovable){
            this.$emit('remove', event)
        }
    }

    get classes() {
        const classes:string[] = [`tag--size-${this.size}`]
        if(this.isDisabled) {
            classes.push('is-disabled')
        }

        if(this.isRemovable) {
            classes.push('is-removable')
        }
        return classes
    }

    get isRemovable() {
        return typeof this.removable !== 'undefined' && this.removable !== false
    }

    get isDisabled() {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }
}

</script>
