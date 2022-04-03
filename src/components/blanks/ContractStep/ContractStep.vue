<template lang="pug">

.b-contract-step
    c-grid-form(
        :fieldMap="fields"
        :layout="layout.grid"
        :values.sync="auctionFields.values"
        :errors.sync="auctionFields.errors"
        :spacing="layout.spacing"
    )

</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'
import regulars from "@/utils/default/regulars"
import GridLayout from "@/components/layouts/GridLayout.vue"
import {DeviceProviderValue} from "@/mixins/device"

@Component
export default class ContractStep extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    fields = {
        nmck: {
            component: 'input',
            validRegex: regulars.notEmptyField,
            binding: {
                label: 'НМЦК, ₽',
                placeholder: 'Введите цену',
                mask: 'decimal',
                size: 'l',
            },
        },
        lotCount: {
            component: 'input',
            validRegex: regulars.notEmptyField,
            binding: {
                label: 'Количество лотов',
                placeholder: 'Введите количество',
                mask: 'number',
                size: 'l',
            },
        },
        publishDate: {
            component: 'input-datepicker',
            validRegex: regulars.date,
            binding: {
                label: this.$device.size.mobile
                    ? 'Публикация аукциона'
                    : 'Дата публикации аукциона',
                placeholder: 'дд.мм.гггг',
                size: 'l',
            },
        },
        ...regulars.notEmptyField === /.+/ ? {
            iku: {
                component: 'input',
                validRegex: regulars.iku,
                binding: {
                    label: 'ИКУ',
                    placeholder: 'Введите 36-значный код',
                    mask: 'iku',
                    size: 'l',
                },
            },
        } : {
            ikz: {
                component: 'input',
                validRegex: regulars.ikz,
                binding: {
                    label: 'ИКЗ',
                    placeholder: 'Введите 36-значный код',
                    mask: 'ikz',
                    size: 'l',
                },
            },
        },
        cooperative: {
            component: 'card-checkbox',
            binding: {
                label: 'Совместная закупка',
                size: 'l',
            },
        },
        closedTender: {
            component: 'card-checkbox',
            binding: {
                label: 'Закрытый тендер',
                size: 'l',
            },
        },
        okpd2: {
            component: 'input',
            validRegex: regulars.okpd2,
            binding: {
                label: 'ОКПД2',
                placeholder: 'Укажите классификацию',
                mask: 'okpd2',
                size: 'l',
            },
        },
        link: {
            component: 'input',
            validRegex: regulars.notEmptyField,
            binding: {
                label: 'Ссылка на конкурсную процедуру',
                placeholder: 'Введите ссылку',
                size: 'l',
            },
        },
        region: {
            component: 'input',
            validRegex: regulars.notEmptyField,
            binding: {
                label: 'Регион оказания услуг',
                placeholder: 'Введите регион',
                size: 'l',
            },
        },
        subjectContract: {
            component: 'input',
            validRegex: regulars.notEmptyField,
            binding: {
                label: 'Предмет контракта',
                placeholder: 'Введите предмет контракта',
                size: 'l',
            },
        },
        protocolName: {
            component: 'input',
            binding: {
                label: 'Наименование протокола',
                placeholder: 'Введите наименование',
                size: 'l',
            },
        },
        protocolNumber: {
            component: 'input',
            binding: {
                label: 'Номер протокола',
                placeholder: 'Введите номер',
                mask: 'number',
                size: 'l',
            },
        },
        protocolDate: {
            component: 'input-datepicker',
            binding: {
                label: 'Дата протокола итогов',
                placeholder: 'дд.мм.гггг',
                mask: 'date',
                size: 'l',
            },
        },
    }

    get layout() {
        return {
            grid: this.$device.size.mobile ?
                [['auto'], ['auto', 'auto']] :
                [['auto', 'auto', 'auto'], ['auto'], ['auto', 'auto'], ['auto'], ['auto'], ['auto'], ['auto'], ['auto'], ['auto', 'auto']],
            spacing: ['green', 12] as GridLayout['spacing'],
            titles: {
                [this.$device.size.mobile ? 8 : 6]: 'Данные о протоколе',
            },
        }
    }
}
</script>

<style lang="scss" src="./contract-step--critical.scss"></style>
<style lang="scss" src="./contract-step--main.scss"></style>
