<template lang="pug">
    card-component.b-card-filters(
        :interactive="false"
    )
        filters-layout-component(
            v-model="valueModel"
            :selectsOptions="selectsOptions"
        )
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'
import FiltersLayout from "../../blanks/FiltersLayout.vue";
import {FiltersOptions} from "../../../js/types/utils/other";
import {SelectOption} from "../../../js/types/components/ui/select";

@Component({
    components: {
        'filters-layout-component': FiltersLayout
    }
})
export default class CardFilters extends Vue {
    @VModel() valueModel!: FiltersOptions
    @Prop() selectsOptions!: Record<string, SelectOption[]>
}

</script>
