<template lang="pug">

.home
    c-auction-step
    //c-contract-step

    button-component(
        ariaLabel="button"
        @click="onCLick"
    ) validate

</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'

import Button from '@/components/ui/Button.vue'

import { AuctionStep } from "@/components/blanks/AuctionStep"
import {ContractStep} from "@/components/blanks/ContractStep"
import AuctionStepMixin from "@/mixins/steps/auctionStep/auctionStepMixin"
import '@/schemas/posts'

@Component({
    components: {
        'button-component': Button,
        'c-contract-step': ContractStep,
        'c-auction-step': AuctionStep,
    },
})
export default class Home extends Mixins(AuctionStepMixin) {
    onCLick(): void {
        this.validate()
    }
}
</script>

<style lang="scss">
#app {
    width: 100%;
}
.home {
    display: inline-block;
    //width: 700px;
    margin: 0 auto;
}
</style>
