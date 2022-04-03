<template lang="pug">
    div
        component(
            v-for="modalName in modalsList"
            v-if="$isOpenModal(modalName)"
            :key="modalName"
            :is="`modal-${modalName}-component`"
        )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {modals} from "../js/store/modules/modals/state";

@Component
export default class Modals extends Vue {
    modalsForOrder = [modals.ORDER_CREATE, modals.ACCOUNTING, modals.ADD_COMPANY, modals.ORDER]
    modalsForAllPages = [modals.DIALOG]

    get modalsList(){
        const mapRoutes = {
            'orders': [
                ...this.modalsForOrder
            ]
        } as Record<string, modals[]>

        return [
            ...this.modalsForAllPages,
            ...mapRoutes[this.$route.name as string]
        ]
    }
}

</script>
