<template lang="pug">

.b-auction-step
    c-grid-form(
        :fieldMap="fieldsAppearance"
        :layout="layout"
        :values.sync="auctionStep.state"
        :errors.sync="auctionStep.errors"
        :spacing="['green', 12]"
    )
    //p {{ auctionStep.state }}
    //p {{ auctionStep.errors }}

</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import GridForm from "@/components/blanks/modals/modal-add-company/GridForm.vue"
import Select from "@/components/ui/Select.vue"
import InputMultiDatepicker from "@/components/ui/InputMultiDatepicker.vue"
import InputDatepicker from "@/components/ui/InputDatepicker.vue"
import Input from "@/components/ui/Input.vue"
import AuctionStepMixin from "@/mixins/steps/auctionStep/auctionStepMixin"

@Component({
    components: {
        'c-grid-form': GridForm,
        'c-select': Select,
        'c-input-multi-datepicker': InputMultiDatepicker,
        'c-input-datepicker': InputDatepicker,
        'c-input': Input,
    },
})
export default class AuctionStep extends Mixins(AuctionStepMixin) {
    is663 = false

    get isProduct() {
        return this.is663 ? /\d{11}/ : /\d{19}/
    }

    get fieldsAppearanceAppend() {
        return {
            number: {
                validRegex: this.isProduct,
                binding: {
                    loading: false,
                }
            },
            financeProductId: {
                binding: {
                    options: [
                        {
                            id: 1,
                            text: 'bank guarantee'
                        },
                        {
                            id: 2,
                            text: 'auction'
                        }
                    ]
                }
            }
        }
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
