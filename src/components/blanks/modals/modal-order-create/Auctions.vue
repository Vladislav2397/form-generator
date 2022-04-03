<template lang="pug" >

.b-auctions
    grid-form-component(
        :fieldMap="auctions"
        :layout="layouts.auction.grid"

        @input="setAuction"
    )

</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Auctions extends Vue {
    @Prop() readonly fields!: Record<string, string>

    @Emit('input') inputEmit(field, value) {/**/}
}
</script>
