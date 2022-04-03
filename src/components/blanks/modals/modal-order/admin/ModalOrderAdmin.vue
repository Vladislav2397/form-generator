<template lang="pug">
    modal-big-component.b-modal-order(
        :name="modals.ORDER"
        :showAppend="showAppend"
    )
        p Admin
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { modals } from '../../../../../js/store/modules/modals/state'

@Component({
    components: {}
})
export default class ModalOrderAdmin extends Vue {
    showAppend = false
    modals = Object.freeze(modals)
}

</script>
