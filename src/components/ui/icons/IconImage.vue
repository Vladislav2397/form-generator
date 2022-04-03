<template lang="pug">
    .b-icon-image
        img.lazyload(
            v-if="name"
            :alt="`Иконка ${name}`"
            :data-src="src"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

export interface IIconImageProps {
    name: string
    src: string
}

@Component
export default class Icon extends Vue {
    @Prop({ required: true }) readonly name!: IIconImageProps['name']
    @Prop({ required: true }) readonly src!: IIconImageProps['src']
}

</script>
