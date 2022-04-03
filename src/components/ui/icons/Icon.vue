<template lang="pug">
    .b-icon(
        :class="`icon--size-${size}`"
    )
        icon-image-component.__image(
            v-if="name"
            :name="name"
            :src="src"
        )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IconSize} from "../../../js/types/components/ui/icon"

export interface IIconProps {
    size?: IconSize
    name: string
    src: string
}

@Component
export default class Icon extends Vue {
    @Prop({ default: 'm' }) readonly size!: IIconProps['size']
    @Prop({ required: true }) readonly name!: IIconProps['name']
    @Prop({ required: true }) readonly src!: IIconProps['src']
}

</script>
