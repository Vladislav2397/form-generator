<template lang="pug">

.home
    c-auction-step
    //c-contract-step

    p isValid {{ isValid }}
    p filledCount {{ filledCount }}

    button-component(
        ariaLabel="button"
        @click="onCLick"
    ) validate

</template>

<script lang="ts">
import {Component, ProvideReactive, Vue} from 'vue-property-decorator'

import Button from '@/components/ui/Button.vue'

import { AuctionStep } from "@/components/blanks/AuctionStep"
import {/*auctionStep,*/ state, errors, /*isValid*/} from "@/services/auctionStep"
import AuctionFieldsService from "@/services/AuctionFieldsService"
import {ContractStep} from "@/components/blanks/ContractStep"

@Component({
    components: {
        'button-component': Button,
        'c-contract-step': ContractStep,
        'c-auction-step': AuctionStep,
    },
    // computed: {
    //     isValid,
    // }
})
export default class Home extends Vue {
    @ProvideReactive(AuctionFieldsService.key) auctionFields = {
        values: state,
        errors,
    }

    get isValid() {
        return Object.values(state).every(item => {
            console.log('auctionStep isValid')

            if (Array.isArray(item)) {
                return item.every(value => Boolean(value))
            }
            return Boolean(item)
        })
    }

    get filledCount() {
        console.log('filledCount')

        return +!!this.auctionFields.values.number +
            +!!this.auctionFields.values.financeProductId +
            +!!this.auctionFields.values.date[0] +
            +!!this.auctionFields.values.date[1] +
            +!!this.auctionFields.values.sum +
            +!!this.auctionFields.values.proposedPrice
    }

    // auctionStep = createAuctionStep()

    // validate = auctionStep.validate

    onCLick(): void {
        // this.auctionFields.validate()
    }
}
</script>

<style lang="scss">
#app {
    width: 100%;
}
.home {
    display: inline-block;
    width: 700px;
    margin: 0 auto;
}
</style>
