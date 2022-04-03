<template lang="pug">
    modal-small-component.b-modal-dialog(
        :buttons="options.buttons"
        :name="modals.DIALOG"
    )
        .__content
            title-component.__title(
                v-if="options.title"
                size="s"
            ) {{ options.title }}
            .__description(
                v-if="options.description"
            ) {{ options.description }}

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import {modals} from "../../../js/store/modules/modals/state";
import {Action, Getter} from "../../../js/decorators";
import {ModalsPayloadGetter} from "../../../js/store/modules/modals/getters";
import {ModalsRemoveActiveAction} from "../../../js/store/modules/modals/actions";

@Component
export default class ModalDialog extends Vue {
    @Getter('modals/payload') payload!: ModalsPayloadGetter
    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    get options() {
       return {
           buttons: this.payload?.buttons,
           title: this.payload?.title,
           description: this.payload?.description,
       }
    }

    modals = Object.freeze(modals)
}

</script>
