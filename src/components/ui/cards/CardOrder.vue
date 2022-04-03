<template lang="pug">
    card-component.b-card-order(
        v-bind="attrs"
        @click="$emit('click', $event)"
    )
        .__top
            .__item
                .__information.--number {{ formattedData.number }}
                link-component.__link.--date(
                    v-if="isBig"
                    tag="p"
                    underline="none"
                    view="secondary"
                    href="/"
                    size="s"
                ) {{ formattedData.date }}
            .__item.--company(
                v-if="isBig"
            )
                .__information.--inn {{ formattedData.inn }}
                link-component.__link.--company-name(
                    tag="button"
                    underline="dashed"
                    view="secondary"
                    size="s"
                    @click.stop
                ) {{ formattedData.companyName }}
            .__item(
                :class="{'card-order__item--align-right': isSmall}"
            )
                .__information.--contract-sum {{ formattedData.contractSum }}
                link-component.__link.--contract-number(
                    tag="a"
                    view="secondary"
                    href="/"
                    size="s"
                    @click.stop
                ) {{ formattedData.contractNumber }}
            .__item.--align-right.--wide(
                v-if="isBig"
            )
                .__sum {{ formattedData.guaranteeSum }}
        divider-component.__divider(
            view="secondary"
        )
        .__bottom
            .__bank
                icon-component.__icon.--bank(
                    :src="getIconSvg('bank', {view:'secondary'})"
                    name="банк"
                )
                .__text.--bank {{ formattedData.bankText }}
            .__sum(
                v-if="isSmall"
            ) {{ formattedData.guaranteeSum }}
            .__statuses
                badge-component.__status(
                    v-for="(status, key, index) in statuses"
                    :key="index"
                    :view="orderStatus[key].view"
                    :showIndicator="!$device.size.mobile"
                ) {{status}} {{ orderStatus[key].text }}
            .__wrapper.--button
                button-component.__button(
                    view="outline-brand"
                    ariaLabel="Открыть заявку"
                ) Открыть заявку
</template>

<script lang="ts">
import {Component, Inject, Prop, Mixins} from 'vue-property-decorator'
import {OrderBankType, CompanyItem, Contract} from "../../../js/types/data/order";
import {getIconSvg} from '../../../js/utils/service/getResources'
import {wordEndByNumber} from "../../../js/utils/default/wordEndByNumber";
import {orderStatus} from '../../../js/utils/service/dataConverters';
import {toNumberDecimal} from "../../../js/utils/default/regulars";
import card from '../../../js/mixins/components/ui/card.vue'
import {DeviceProviderValue} from "../../../js/providers/device";


export interface ICardOrderProps {
    number: number | string
    idStatus: number | string
    date: string
    contract: Contract
    company: CompanyItem
    banks: OrderBankType[]
}

@Component
export default class CardOrder extends Mixins(card) {
    @Prop({ required: true }) readonly number!: ICardOrderProps['number']
    @Prop({ required: true }) readonly idStatus!: ICardOrderProps['idStatus']
    @Prop({ required: true }) readonly date!: ICardOrderProps['date']
    @Prop({ required: true }) readonly contract!:ICardOrderProps['contract']
    @Prop({ required: true }) readonly company!: ICardOrderProps['company']
    @Prop({ required: true }) readonly banks!: ICardOrderProps['banks']

    @Inject('$device') $device!: DeviceProviderValue

    get formattedData(): Record<string, unknown>{
        return {
            number: `БГ—${this.number}`,
            date: this.date,
            inn: `ИНН ${this.company.inn}`,
            companyName: this.company.name,
            contractSum: `${toNumberDecimal(this.contract.sum)} ₽`,
            contractLink: this.contract.link,
            contractNumber: `№ ${this.contract.number}`,
            bankText: this.banks.length > 1 ? `${this.banks.length} ${wordEndByNumber('банк',this.banks.length, ['', 'а', 'ов'])}` : this.banks[0].name,
            guaranteeSum: `${this.banks.length > 1 ? 'от' : ''} ${toNumberDecimal(this.bankMinSum)} ₽`
        }
    }

    get bankMinSum(): number | string {
        const sums = this.banks.map(bank => parseFloat(bank.sum.toString()))
        return this.banks.length > 1 ? Math.min(...sums) : this.banks[0].sum
    }

    //  TODO Доделать окончания для статусов

    get statuses(): {} {
        return this.banks.reduce((acc, bank) => ({
                ...acc,
            // eslint-disable-next-line no-param-reassign
                [bank.idStatus]: acc[bank.idStatus] ? ++acc[bank.idStatus] : 1
            }), {})
    }

    get isSmall():boolean{
        return this.$device.size.mobile || this.$device.size.tablet && !this.$device.size.tabletLate
    }

    get isBig():boolean{
        return this.$device.size.tabletLate || this.$device.size.desktop
    }

    getIconSvg = getIconSvg
    orderStatus = orderStatus
}

</script>
