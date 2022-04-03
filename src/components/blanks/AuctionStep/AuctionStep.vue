<template lang="pug">

.b-auction-step
    c-grid-form(
        :fieldMap="fields"
        :layout="layout"
        :values.sync="auctionFields.values"
        :errors.sync="auctionFields.errors"
        :spacing="['green', 12]"
    )
    p {{ auctionFields.values }}
    p {{ auctionFields.errors }}

</template>

<script lang="ts">
import {Component, InjectReactive, Vue} from 'vue-property-decorator'
import GridForm from "@/components/blanks/modals/modal-add-company/GridForm.vue"
import Select from "@/components/ui/Select.vue"
import InputMultiDatepicker from "@/components/ui/InputMultiDatepicker.vue"
import InputDatepicker from "@/components/ui/InputDatepicker.vue"
import Input from "@/components/ui/Input.vue"
// import {auctionStep} from "@/services/auctionStep"
import {fieldByName, fieldByNameWithKey} from "@/utils/field/genInputData"
import AuctionFieldsService from "@/services/AuctionFieldsService"

@Component({
    components: {
        'c-grid-form': GridForm,
        'c-select': Select,
        'c-input-multi-datepicker': InputMultiDatepicker,
        'c-input-datepicker': InputDatepicker,
        'c-input': Input,
    },
})
export default class AuctionStep extends Vue {
    @InjectReactive(AuctionFieldsService.key) auctionFields!: AuctionFieldsService

    // auctionStep = auctionStep

    fields = {
        number: fieldByName('auctionNumber'),
        ...fieldByNameWithKey('financeProductId', {
            binding: {
                options: [
                    {
                        id: 1,
                        text: 'bank guarantee',
                    },
                    {
                        id: 2,
                        text: 'bank guarant',
                    },
                    {
                        id: 3,
                        text: 'bank guar',
                    },
                ]
            }
        }),
        date: fieldByName('auctionDate'),
        sum: fieldByName('auctionSum'),
        ...fieldByNameWithKey('proposedPrice'),
    }

    get layout(): string[][] {
        return [
            ['auto', 'auto'],
            ['auto', 'auto'],
            ['auto']
        ]
    }
}
</script>

<style lang="scss" src="./auction-step--critical.scss"></style>
<style lang="scss" src="./auction-step--main.scss"></style>
