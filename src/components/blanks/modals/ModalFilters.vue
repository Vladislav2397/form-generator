<template lang="pug">
    modal-small-component.b-modal-filters(
        :buttons="buttons"
        :name="modals.FILTERS"
    )
        filters-layout-component(
            v-model="localValue"
            :selectsOptions="selectsOptions"
        )

</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'
import {ButtonItem, FiltersOptions} from "../../../js/types/utils/other";
import {modals} from "../../../js/store/modules/modals/state";

import FiltersLayout from "../FiltersLayout.vue";
import {SelectOption} from "../../../js/types/components/ui/select";
import {ModalsRemoveActiveAction} from "../../../js/store/modules/modals/actions";
import {Action} from "../../../js/decorators";

@Component({
    components: {
        'filters-layout-component': FiltersLayout
    }
})
export default class ModalFilters extends Vue {
    @Prop() selectsOptions!: Record<string, SelectOption[]>
    @VModel() valueModel!: FiltersOptions
    @Prop() value!: FiltersOptions

    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    localValue = this.value

    setValueModel(){
        this.valueModel = this.localValue
        this.closeModal()
    }

    buttons: ButtonItem[] = [
        {
            text: 'Закрыть',
            callback: this.closeModal,
            view: 'secondary-brand'
        },
        {
            text: 'Применить',
            callback: this.setValueModel
        },
    ]

    modals = Object.freeze(modals)
}

</script>
