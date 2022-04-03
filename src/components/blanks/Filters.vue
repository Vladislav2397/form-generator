<template lang="pug">
    .b-filters
        modal-filters-component(
            v-if="isShowModal"
            v-model="valueModel"
            :selectsOptions="selectsOptions"
        )
        card-filters-component(
            v-else-if="!isModalInLayout"
            v-model="valueModel"
            :selectsOptions="selectsOptions"
        )

</template>

<script lang="ts">
import {Component, Inject, Prop, PropSync, VModel, Vue, Watch} from 'vue-property-decorator'
import CardFilters from "../ui/cards/CardFilters.vue";
import {ModalsSetActiveAction} from "../../js/store/modules/modals/actions";
import {modals} from "../../js/store/modules/modals/state";
import {ModalsActiveGetter} from "../../js/store/modules/modals/getters";
import {DeviceProviderValue} from "../../js/providers/device";
import {FiltersOptions} from "../../js/types/utils/other";
import {SelectOption} from "../../js/types/components/ui/select";
import {Action, Getter} from "../../js/decorators";



@Component({
    components: {
        'card-filters-component': CardFilters,
    }
})

export default class Filters extends Vue {
    @PropSync('active') activeSync!: boolean
    @Prop() selectsOptions!: Record<string, SelectOption[]>
    @Inject('$device') $device!: DeviceProviderValue
    @VModel() valueModel!: FiltersOptions

    @Getter('modals/active') activeModals!: ModalsActiveGetter
    @Action('modals/setActive') openModal!: ModalsSetActiveAction

    mounted() {
        if(this.isModalInLayout){
            this.openModal({
                name: modals.FILTERS
            })
        }
    }

    @Watch('activeModals')
    onChangeActiveModals(){
        if(!this.$isOpenModal(modals.FILTERS)) {
            this.activeSync = false
        }
    }


    get isModalInLayout(){
        return this.$device.size.mobile || this.$device.size.tablet && !this.$device.size.tabletLate
    }

    get isShowModal(){
        return this.$isOpenModal(modals.FILTERS) && this.isModalInLayout
    }


    modals = modals
}

</script>
