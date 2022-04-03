<template lang="pug">
    component.b-logo(
        v-bind="attrs"
        :is="tag"
        :class="`logo--view-${view}`"
    )
        include ../../assets/images/utility/logo-beta.svg
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class Logo extends Vue {
    @Prop({ default: 'base' }) readonly view!: string

    @Prop({ default: 'div' }) readonly tag!: string

    @Prop() readonly href!: string

    get attrs() {
        return {
            ...this.tag === 'a' && {
                target: '_blank',
                rel: 'noopener noreferrer',
                href: this.href
            },
            ...this.tag === 'router-link' && {
                to: this.href
            }
        }
    }
}

export default Logo

</script>
