<template lang="pug">
    .b-bank-logo(
        :class="{'bank-logo--small': small}"
    )
        img.lazyload(
            v-if="id !== null"
            :data-src="getBankLogo(id, {small: isSmall , monochrome: isMonochrome})"
            :alt="`Логотип банка ${name}`"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {getBankLogo} from "../../js/utils/service/getResources";
import SkeletonRound from "./skeletons/SkeletonRound.vue";

export interface IBankLogo {
    id: number
    small?: boolean | string
    monochrome?: boolean | string
    name?: string
}

@Component({
    components: {
        'skeleton-round-component': SkeletonRound
    }
})
export default class BankLogo extends Vue {
    @Prop() readonly id!: IBankLogo['id']
    @Prop({default: false}) readonly small?: IBankLogo['small']
    @Prop({default: false}) readonly monochrome?: IBankLogo['monochrome']
    @Prop() readonly name?: IBankLogo['name']

    get isSmall(){
        return typeof this.small !== 'undefined' && this.small !== false
    }

    get isMonochrome(){
        return typeof this.monochrome !== 'undefined' && this.monochrome !== false
    }

    getBankLogo = getBankLogo
}

</script>
