<template lang="pug">
    .image
        picture(
            :src="fallbackSrc"
        )
            //:srcset="`${path}.webp`"
            source(
                type="image/webp"
                :data-srcset="`${path}.webp`"
            )
            //:srcset="fallbackSrc"
            source(
                :data-srcset="fallbackSrc"
                :type="`image/${fallbackExt}`"
            )
            //:src="fallbackSrc"
            img.lazyload(
                v-lazysizes
                :key="'image'"
                :data-src="fallbackSrc"
                :data-lowsrc="blur"
                :alt="alt"
            )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class ImageLazy extends Vue {
    @Prop({
        required: true
    }) readonly path!: string

    @Prop({
        required: true
    }) readonly fallbackExt!: string

    @Prop({
        required: true
    }) readonly alt!: string

    @Prop({
        default: ''
    }) readonly blur!: string

    @Prop() readonly width!: number

    @Prop() readonly height!: number

    get fallbackSrc (): string {
        return `${this.path}.${this.fallbackExt}`
    }
}

export default ImageLazy
</script>
