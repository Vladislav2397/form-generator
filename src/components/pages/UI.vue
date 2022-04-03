<template lang="pug">
    div.b-test
        .__title Tabs
        .__cell
            tabs-component(
                v-model="tabs.value"
                :list="tabs.list"
            )
        .__title Tables
        .__title TableAccounting
        .__cell
            table-accounting-component(
                :data="tableAccounting"
            )
        .__title Skeletons
        .__title SkeletonCardInfo
        .__row
            .__cell
                skeleton-card-info-component
        .__row
            .__cell
                skeleton-card-info-component(
                    :items="['label']"
                )
        .__row
            .__cell
                skeleton-card-info-component(
                    :items="['label', 'promo']"
                )
        .__row
            .__cell
                skeleton-card-info-component(
                    :items="['label', 'promo', 'description']"
                )
        .__title SkeletonText
        .__row(
            v-for="size in ['xs', 's', 'm', 'l']"
        )
            .__cell(
                v-for="view in ['base', 'secondary', 'success']"
            )
                skeleton-text-component(
                    :view="view"
                    :size="size"
                )
        //.__title IconFile
        //.__cell(
        //    v-for="status in ['none', 'error', 'loaded', 'loading', 'default']"
        //)
        //    icon-file-component(
        //        :status="status"
        //    )
        //.__title IconStatus
        //.__row(
        //    v-for="size in ['m', 'l']"
        //)
        //    .__cell(
        //        v-for="view in ['system', 'critical', 'success', 'warning']"
        //    )
        //        icon-status-component(
        //            :size="size"
        //            :view="view"
        //        )
        //.__title(
        //    @click="onTitleClick"
        //) InputHOC
        //.__row
        //    input-hoc-component(
        //        :component="collapsibleForm.inputs.forms.number"
        //        size="l"
        //    )

        .__title Collapsible Counter Form
        .__row.left
            collapsible-counter-form-component(
                :countFilled="collapsibleForm.inputs.filled()"
                :maxCounter="collapsibleForm.inputs.fieldsCount()"
                :isOpen.sync="collapsibleForm.isOpen"
                :layout="collapsibleForm.layout"
                title="Collapse form"
            )
                input-hoc-component(
                    v-for="[key, component] in collapsibleForm.inputs.asList"
                    :key="key"
                    :component="component"
                    size="l"
                )
            button-component(
                :style="'margin: 3rem 0 3rem;'"
                ariaLabel="some"
                @click="validate"
            ) Validation

            card-checkbox-component(
                v-model="collapsibleForm.isOpen"
            ) Alo

        .__title Collapse
        .__row
            .__cell(
                style="text-align:left;"
            )
                collapse-component(
                    v-model="isOpen"
                )
                    grid-layout-component(
                        :layout="collapse.layout"
                        :spacing="['12']"
                    )
                        input-component(
                            v-for="(input, index) in collapse.inputs"
                            :key="index"
                            v-model="collapse.inputValue"
                            :label="input.label"
                            :placeholder="input.placeholder"
                            size="l"
                        )
                        card-checkbox-component(
                            v-for="(checkbox,index) in collapse.checkboxes"
                            :key="index"
                            v-model="collapse.inputCheck"
                        ) {{ checkbox }}
            .__cell
        .__title Toast
        .__row
            .__cell
                button-component(
                    @click="showToast"
                    aria-label=""
                ) Открыть Toast
            .__cell
                select-component(
                    v-model="toast.view"
                    label="View"
                    :options="toast.listView"
                )
            .__cell
                select-component(
                    v-model="toast.position"
                    label="Позиция"
                    :options="toast.listPosition"
                )
        .__title Grid Row Layout
        //.__row
        //    grid-row-layout-component(
        //        :layout="['auto', '200px', '100px', '10%', 'auto']"
        //    )
        //        input-component.__item(
        //            v-for="(_, index) in new Array(5)"
        //            :key="index"
        //            :placeholder="`input`"
        //            v-model="inputValue"
        //            size="l"
        //        )
        //.__row
        //    grid-row-layout-component(
        //        :layout="['auto', '10%', 'auto']"
        //    )
        //        input-component.__item(
        //            v-for="(_, index) in new Array(3)"
        //            :key="index"
        //            :placeholder="`input`"
        //            v-model="inputValue"
        //            size="l"
        //        )
        //.__row
        //    grid-row-layout-component(
        //        :layout="['auto', 'auto', 'auto']"
        //    )
        //        input-component.__item(
        //            v-for="(_, index) in new Array(3)"
        //            :key="index"
        //            :placeholder="`input`"
        //            v-model="inputValue"
        //            size="l"
        //        )
        .__title Grid Layout
        .__row
            grid-layout-component(
                :spacing="[12]"
                :layout="layout"
            )
                input-component.__item(
                    v-for="(form, index) in inputForms"
                    v-model="inputValue"
                    :key="index"
                    :placeholder="form.placeholder"
                    :label="form.label"
                    size="l"
                )
        .__title Checkbox
        //.__row
        //    .__cell
        //        card-checkbox-component.__item(
        //            v-model="checkboxValue"
        //        ) title
        //    .__cell
        //        card-checkbox-component.__item(
        //            v-model="checkboxValue"
        //        )
        //    .__cell
        //        card-checkbox-component.__item(
        //            v-model="checkboxValue"
        //            disabled
        //        ) title
        .__row(
            v-for="size in ['s', 'm']"
        )
            .__cell
                checkbox-component(
                    v-model="checkboxValue"
                    :size="size"
                )
            .__cell
                checkbox-component(
                    v-model="checkboxValue"
                    :size="size"
                    intermediate
                )
            .__cell
                checkbox-component(
                    v-model="checkboxValue"
                    :size="size"
                    disabled
                )
        .__title Tag
        .__row(
            v-for="size in ['s', 'm']"
        )
            .__cell
                tag-component(
                    :size="size"
                ) tag {{ size }}
            .__cell
                tag-component(
                    :size="size"
                    removable
                ) tag  {{ size }}
            .__cell
                tag-component(
                    :size="size"
                    disabled
                ) tag  {{ size }}
        .__title Select
        .__row(
            v-for="size in selects"
        )
            .__cell
                select-component.__item(
                    v-model="select.value"
                    :label="`label ${size}`"
                    :description="`description ${size}`"
                    :placeholder="`placeholder ${size}`"
                    :options="select.options"
                    :size="size"
                )
            .__cell
                select-component.__item(
                    v-model="select.multiValue"
                    :active.sync="select.active"
                    :label="`label multi ${size}`"
                    :description="`description multi ${size}`"
                    :placeholder="`placeholder multi ${size}`"
                    :options="select.options"
                    :size="size"
                )
            .__cell
                select-component.__item(
                    v-model="select.multiValue"
                    :active.sync="select.active"
                    :label="`label multi ${size}`"
                    :description="`description multi ${size}`"
                    :placeholder="`placeholder multi ${size}`"
                    :options="select.options"
                    :size="size"
                    disabled
                )
            .__cell
                select-component.__item(
                    v-model="select.multiValue"
                    :active.sync="select.active"
                    :label="`label multi ${size}`"
                    :description="`description multi ${size}`"
                    :placeholder="`placeholder multi ${size}`"
                    :options="select.options"
                    :size="size"
                    search
                )
        .__title Radio
        .__row
            .__cell
                radio-component.__item(
                    v-model="radio.value"
                    name="test"
                    label="label"
                    description="description"
                    :options="radio.options"
                )
        .__row
            .__cell
                radio-component.__item(
                    v-model="radio.value1"
                    name="test1"
                    label="label"
                    description="description"
                    direction="row"
                    :options="radio.options"
                )
        .__title ProgressBar
        .__row(
            v-for="bar in bars"
        )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="[1]"
                    size="s"
                )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="[1]"
                )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="[1]"
                    size="l"
                )
        .__row(
            v-for="bar in bars"
        )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="[1, 1]"
                    size="s"
                )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="[1, 1, 1]"
                )
            .__cell
                progress-bar-component.__item(
                    :view="bar"
                    :value="progressBarValue"
                    :steps-names="progressBarStepsNames"
                    size="l"
                )
            .__cell
                button-component(
                    @click="setValue"
                    aria-label="Изменить"
                ) Изменить

        .__title Cards
        .__title CardBannerInfo
        .__row(
            v-for="direction in ['row', 'column']"
        )
            .__cell
                card-banner-info-component(
                    :title="direction"
                    :direction="direction"
                    :buttons="[{text: 'Button 1', callback: () => {}}, {text: 'Button 2', callback: () => {}}]"
                    status="critical"
                    description="description"
                )
            .__cell
                card-banner-info-component(
                    :title="direction"
                    :direction="direction"
                    :buttons="[{text: 'Button 1', callback: () => {}}]"
                    :icon="getIconSvg('bank', {view:'secondary'})"
                    description="description"
                )
            .__cell
                card-banner-info-component(
                    :title="direction"
                    :direction="direction"
                    :loading="true"
                    description="description"
                )
            .__cell
                card-banner-info-component(
                    :title="direction"
                    :direction="direction"
                )
            .__cell
                card-banner-info-component(
                    :description="direction"
                    :direction="direction"
                )
            .__cell
                card-banner-info-component(
                    :direction="direction"
                    status="success"
                )
        .__title CardAttachment
        .__row
            .__cell
                card-attachment-component(
                    name="Паспорт"
                    :value="null"
                )
            .__cell
                card-attachment-component(
                    name="ИНН"
                    :value="null"
                    progress="33"
                )
            .__cell
                card-attachment-component(
                    name="Снилс"
                    :value="1"
                )
            .__cell
                card-attachment-component(
                    name="Снилс"
                    :value="1"
                )
            .__cell
                card-attachment-component(
                    name="ОГРН"
                    :value="null"
                    :error.sync="error"
                    :errorText="'Ошибка загрузки файла'"
                )
        .__title CardInfo
        .__row
            .__cell(
                v-for="card in cards"
            )
                card-info-component(
                    v-bind="card.info"
                    @click="testClick"
                )
        .__title CardOrder
        .__row
            .__cell(
                v-for="card in cards"
            )
                card-order-component(
                    :view="orderCardView[card.order.idStatus]"
                    v-bind="card.order"
                    @click="testClick"
                )
        .__title Card
        .__row(
            v-for="card in cards"
        )
            .__cell
                card-component(
                    :view="orderCardView[card.order.idStatus]"
                ) {{ orderCardView[card.order.idStatus] }}
            .__cell
                card-component(
                    :view="orderCardView[card.order.idStatus]"
                    :disabled="true"
                ) {{ orderCardView[card.order.idStatus] }} disabled
            .__cell
                card-component(
                    :view="orderCardView[card.order.idStatus]"
                    :interactive="false"
                ) {{orderCardView[card.order.idStatus]}} not interactive
        .__title InputMultiDatepicker
        .__row
            .__cell
                input-multi-datepicker-component.__item(
                    v-model="multi"
                )
        .__title InputMulti
        .__row
            .__cell
                input-multi-component.__item(
                    v-model="multi"
                    label="label"
                    description="description"
                    size="s"
                    :iconsRight="['placeholder', 'placeholder']"
                    :iconsLeft="['placeholder', 'placeholder']"
                    :placeholders="['placeholder left', 'placeholder right']"
                    :errors.sync="errors"
                )
            .__cell
                input-multi-component.__item(
                    v-model="multi"
                    label="label"
                    description="description"
                )
            .__cell
                input-multi-component.__item(
                    v-model="multi"
                    label="label"
                    description="description"
                    size="l"
                )
        .__title InputDatepicker {{ password }}
        .__row
            .__cell
                input-datepicker-component.__item(
                    v-model="password"
                )
        .__title InputPassword
        .__row
            .__cell
                input-password-component.__item(
                    v-model="password"
                    :error.sync="error"
                )
        .__title Input
        .__row(
            v-for="input in inputs"
        )
            .__cell.-align-top
                input-component.__item(
                    v-model="date"
                    :placeholder="`size ${input}`"
                    label="label"
                    view="flat"
                    description="description"
                    clearable
                    :size="input"
                    iconLeft="placeholder"
                    :error.sync="error"
                )
            .__cell.-align-top
                input-component.__item(
                    v-model="date"
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                    iconLeft="placeholder"
                    :error.sync="error"

                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                    iconRight="placeholder"
                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                    iconRight="placeholder"
                    iconLeft="placeholder"
                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                    :disabled="true"
                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    description="description"
                    :size="input"
                    :error="true"
                )
            .__cell.--align-top
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    errorText="error text"
                    :size="input"
                    :error.sync="error"
                )
                input-component.__item(
                    :placeholder="`size ${input}`"
                    label="label"
                    errorText="error text"
                    :size="input"
                    :error="true"
                )
        .__title _FormItem
        .__row(
            v-for="formItem in inputs"
        )
            .__cell.--align-top
            form-item-component.__item(
                placeholder="placeholder"
                label="label"
                description="description"
                iconLeft="placeholder"
                :size="formItem"
            )
            .__cell.--align-top
                form-item-component.__item(
                    placeholder="placeholder"
                    label="label"
                    description="description"
                    :size="formItem"
                )
            .__cell.--align-top
                form-item-component.__item(
                    placeholder="placeholder"
                    label="label"
                    description="description"
                    iconRight="placeholder"
                    :size="formItem"
                )
            .__cell.--align-top
                form-item-component.__item(
                    placeholder="placeholder"
                    label="label"
                    description="description"
                    iconRight="placeholder"
                    iconLeft="placeholder"
                    :size="formItem"
                )
            .__cell.--align-top
            form-item-component.__item(
                placeholder="placeholder"
                label="label"
                description="description"
                iconRight="placeholder"
                iconLeft="placeholder"
                :size="formItem"
                disabled
            )
        .__title Links
        .__row(
            v-for="link in links"
        )
            .__cell
                link-component(
                    :view="link"
                    icon="left"
                    tag="button"
                ) {{ link }}
            .__cell
                link-component(
                    :view="link"
                    tag="button"
                ) {{ link }}
            .__cell
                link-component(
                    :view="link"
                    icon="right"
                    tag="button"
                ) {{ link }}
            .__cell
                link-component(
                    :view="link"
                    tag="button"
                    underline="dashed"
                ) {{ link }}
            .__cell
                link-component(
                    :view="link"
                    tag="button"
                    underline="none"
                ) {{ link }}
            .__cell
                link-component(
                    :view="link"
                    tag="button"
                    disabled="true"
                ) {{ link }}
        .__title Badges
        .__row
            .__cell(
                v-for="badge in badges"
            )
                badge-component.__item(
                    :view="badge"
                ) {{badge}}
        .__row
            .__cell(
                v-for="badge in badges"
            )
                badge-component.__item(
                    :view="badge"
                    :showIndicator="false"
                ) {{badge}}
        .__title Dividers
        .__row
            .__cell.--block
            divider-component.__item
            .__cell.--block
                divider-component.__item(
                    size="m"
                )
            .__cell.--block
                divider-component.__item(
                    view="secondary"
                )
            .__cell.--block
                divider-component.__item(
                    :round="false"
                )
            .__cell.--block(
                style="height: 200px"
            )
                divider-component.__item(
                    :vertical="true"
                )
        .__title Icons
        .__row
            .__cell
                icon-component.__item(
                    size="s"
                    :src="getBankLogo(1, {small: true})"
                    name="логотип банка открытие"
                )
            .__cell
                icon-component.__item(
                    :src="getBankLogo(1, {small: true})"
                    name="логотип банка открытие"
                )
            .__cell
                icon-component.__item(
                    size="l"
                    :src="getBankLogo(1, {small: true})"
                    name="логотип банка открытие"
                )
        .__title Buttons
        .__row(
            v-for="button in buttons"
        )
            .__cell
                button-component.__item(
                    :view="button"
                    :icon="'placeholder'"
                    ariaLabel="test"
                    size="s"
                )
            .__cell
                button-component.__item(
                    :view="button"
                    :icon="'placeholder'"
                    ariaLabel="test"
                )
            .__cell
                button-component.__item(
                    :view="button"
                    :icon="'placeholder'"
                    ariaLabel="test"
                    size="l"
                ) {{ button }}
            .__cell
                button-component.__item(
                    :view="button"
                    :icon="'placeholder'"
                    ariaLabel="test"
                    size="l"
                    :disabled="true"
                    :iconLeft="true"
                ) {{ button }}
            .__cell
                button-component.__item(
                    :view="button"
                    :icon="'placeholder'"
                    ariaLabel="test"
                    size="l"
                    :loading="true"
                ) {{ button }}

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import CardOrder from '../ui/cards/CardOrder.vue'
import CardInfo from '../ui/cards/CardInfo.vue'
import ProgressBar from '../ui/ProgressBar.vue'
import GridLayout from '../layouts/GridLayout.vue'
import GridRowLayout from '../layouts/GridRowLayout.vue'
import CardAttachment from "../ui/cards/CardAttachment.vue"
import CardBannerInfo from "../ui/cards/CardBannerInfo.vue"
import Collapse from "../blanks/Collapse.vue"
import IconFile from "../ui/icons/IconFile.vue"
import CardCheckbox from "../ui/cards/CardCheckbox.vue"
import CollapsibleCounterForm from "../blanks/CollapsibleCounterForm.vue"
import TableAccounting, {ITableAccountingProps} from "../blanks/tables/TableAccounting.vue";

import FormSingleField from "../../js/utils/formField/formSingleField"
import FormDateField from "../../js/utils/formField/formDateField"
import FormMultipleField from "../../js/utils/formField/formMultipleField"
import FormContainer from "../../js/utils/formField/formContainer"
import InputHOC from "../blanks/InputHOC.vue"

import { getBankLogo, getIconSvg } from '../../js/utils/service/getResources'
import { orderCardView } from '../../js/utils/service/dataConverters'

import { ProgressBarView } from "../../js/types/components/ui/progress-bar"
import { RadioOption } from "../../js/types/components/ui/radio"
import SkeletonCardInfo from "../ui/skeletons/SkeletonCardInfo.vue";
import {TabOption} from "../../js/types/components/ui/tabs";
import Tabs from "../ui/Tabs.vue";

@Component({
    components: {
        'input-hoc-component': InputHOC,
        'collapsible-counter-form-component': CollapsibleCounterForm,
        'card-checkbox-component': CardCheckbox,
        'collapse-component': Collapse,
        'card-order-component': CardOrder,
        'card-info-component': CardInfo,
        'card-attachment-component': CardAttachment,
        'progress-bar-component': ProgressBar,
        'grid-layout-component': GridLayout,
        'grid-row-layout-component': GridRowLayout,
        'icon-file-component': IconFile,
        'skeleton-card-info-component': SkeletonCardInfo,
        'card-banner-info-component': CardBannerInfo,
        'table-accounting-component': TableAccounting,
        'tabs-component': Tabs,
    }
})
export default class UIPage extends Vue {

    tabs = {
        value: 1,
        list: [
            {
                id: 0,
                text: 'Опция 11'
            },
            {
                id: 1,
                text: 'Опция 22312312'
            },
            {
                id: 2,
                text: '1'
            }
        ] as TabOption[]
    }

    tableAccounting:ITableAccountingProps['data'] = {
        head: [
            'Нематериальные активы',
            'Код',
            '31.12.2021',
            '31.11.2021',
        ],
        body: [
            {
                groupName: 'Актив',
                list: [
                    {
                        groupName: '1. Внеоборотные активы',
                        list: [
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '12312312.11',
                                state: 'default',
                                section_id: 1
                            },
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '12312312,11',
                                state: 'default',
                                section_id: 1
                            }
                        ]
                    },
                    {
                        groupName: '2. Внеоборотные активы',
                        list: [
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '12312312',
                                state: 'default',
                                section_id: 1
                            },
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '',
                                state: 'default',
                                section_id: 1
                            }
                        ]
                    }
                ]
            },
            {
                groupName: 'Пассив',
                list: [
                    {
                        groupName: '1. Внеоборотные активы',
                        list: [
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '',
                                state: 'default',
                                section_id: 1
                            },
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '',
                                state: 'default',
                                section_id: 1
                            }
                        ]
                    },
                    {
                        groupName: '2. Внеоборотные активы',
                        list: [
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '',
                                state: 'default',
                                section_id: 1
                            },
                            {
                                title: 'Нематериальные активы',
                                code: '1110',
                                quarter: '',
                                year: '',
                                state: 'strong',
                                section_id: 1
                            }
                        ]
                    }
                ]
            }
        ]
    }


    isOpen = false

    errors = [true, true]

    error = true

    radioValue = null

    checkboxValue = false

    collapse = {
        layout: [
            ['auto', 'auto', 'auto'],
            ['auto'],
            ['auto', 'auto'],
        ] as GridLayout['layout'],
        inputValue: '',
        inputCheck: false,
        inputs: [
            {
                label: 'НМЦК, ₽',
                placeholder: 'Введите цену',
            },
            {
                label: 'Количество лотов',
                placeholder: 'Введите количество',
            },
            {
                label: 'Дата публикации аукциона',
                placeholder: 'дд.мм.гг',
            },
            {
                label: 'ИКЗ',
                placeholder: 'Введите 36-значный код',
            },
        ],
        checkboxes: ['Совместная закупка', 'Закрытый тендер']
    }

    collapsibleForm = {
        isOpen: true,
        layout: [
            ['auto', 'auto'],
            ['auto', 'auto'],
            ['auto', 'auto'],
        ] as GridLayout['layout'],
        inputs: new FormContainer({
            number: new FormSingleField({
                value: '',
                error: false,
                validRegex: /^\d{12}$/,
                optionals: {
                    label: 'Номер аукциона',
                    placeholder: 'Введите номер аукциона',
                    mask: 'number',
                    type: 'input',
                }
            }).setErrorText(() => 'Должно быть 12 чисел'),
            guaranteeType: new FormSingleField({
                value: '',
                validRegex: /.+/,
                optionals: {
                    label: 'Тип банковской гарантии',
                    placeholder: 'Выберите тип',
                    type: 'select',
                    options: [
                        {
                            id: 1,
                            text: 'some'
                        },
                        {
                            id: 2,
                            text: 'values',
                        },
                        {
                            id: 3,
                            text: 'into'
                        },
                        {
                            id: 4,
                            text: 'select',
                        },
                    ]
                },
            }),
            date: new FormDateField({
                value: ['', ''],
                error: [false, false],
                validRegex: /\d{2}\.\d{2}\.\d{4}/,
                optionals: {
                    label: 'Срок предоставления',
                    placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
                    type: 'input-multi-datepicker',
                },
            }),
            sum: new FormSingleField({
                value: '',
                validRegex: /\d+/,
                optionals: {
                    label: 'Сумма гарантии, ₽',
                    placeholder: 'Введите сумму',
                    mask: 'decimal',
                    type: 'input',
                },
            }),
            totalPrice: new FormSingleField({
                value: '',
                validRegex: /\d+/,
                optionals: {
                    label: 'Итоговая цена контракта, ₽',
                    placeholder: 'Введите цену',
                    mask: 'decimal',
                    type: 'input',
                },
            }),
        })
    }

    onTitleClick() {
        const r = this.collapsibleForm.inputs.forms.number.isValid()

        this.collapsibleForm.inputs.forms.number.error = !r
    }

    validate() {
        this.collapsibleForm.inputs.validation()
    }

    getInputProps(input) {
        return {
            label: input.optionals.label,
            ...input instanceof FormMultipleField ? {
                placeholders: input.optionals?.placeholders
            } : {
                placeholder: input.optionals.placeholder
            },
            ...input.optionals.mask && {
                mask: input.optionals.mask
            },
            ...input.optionals.type === 'select' && {
                options: input.optionals.options
            }
        }
    }

    setAuctionData(key, value) {
        this.collapsibleForm.inputs.setFieldValue(key, value)
    }

    select = {
        value: null,
        multiValue: [],
        active: false,
        activeMulti: false,
        options: [
            {
                id: 1,
                text: 'Вариант 1'
            },
            {
                id: 2,
                text: 'Вариант 2'
            },
            {
                id: 3,
                text: 'Вариант 3'
            },
            {
                id: 4,
                text: 'Вариант 4'
            },
            {
                id: 5,
                text: 'Вариант 5'
            },
            {
                id: 6,
                text: 'Вариант 6'
            }
        ]
    }

    radio = {
        value: null,
        value1: null,
        options: [
            {
                id: 1,
                text: 'Item 1'
            },
            {
                id: 2,
                text: 'Item 2',
                disabled: true
            },
            {
                id: 3,
                text: 'Item 3',
            }
        ] as RadioOption[]
    }

    password = '123'

    date = '01.01.2011'

    multi = ['', '']

    selects = [
        's',
        'm',
        'l'
    ]

    buttons = [
        'brand',
        'secondary-brand',
        'outline-brand',
        'outline',
        'flat-brand',
        'critical',
        'success',
        'warning',
        'flat',
    ]

    links = [
        'interactive',
        'base',
        'secondary',
    ]

    badges = [
        'success',
        'critical',
        'warning',
        'system'
    ]

    inputs = [
        'l',
        'm',
        's',
    ]


    bars = [
        'brand',
        'success',
        'critical',
        'system',
    ] as ProgressBarView[]

    cards = [
        {
            order: {
                idStatus: 1,
                company: {
                    name: 'ВолгаМясоМолТоргВнешФинансБанкИнвест Объединение',
                    inn: '780740192914',
                },
                date: '09.12.2012',
                number: '41473',
                contract: {
                    sum: 122989223.99,
                    number: '0138300000421001027',
                    link: 'https://finaxe.ru',
                },
                banks: [
                    {
                        name: 'альфа',
                        idStatus: 1,
                        sum: 164888.00,
                    }
                ]
            },
            info: {
                title: 'Спец. счет для участия в тендерах',
                label: 'Открыть',
                status: {
                    text: 'оплачено',
                },
                promo: 'promo'
            }
        },
        {
            order: {
                idStatus: 2,
                company: {
                    name: 'alo',
                    inn: '780740192914',
                },
                date: '09.12.2012',
                number: '41473',
                contract: {
                    sum: 122989223.99,
                    number: '0138300000421001027',
                    link: 'https://finaxe.ru',
                },
                banks: [
                    {
                        name: 'сбербанк',
                        idStatus: 1,
                        sum: 164888.00,
                    }
                ]
            },
            info: {
                title: 'Спец. счет для участия в тендерах очень длинное название',
                promo: 'promo',
                iconPromo: 'placeholder'
            }
        },
        {
            order:  {
                idStatus: 3,
                company: {
                    name: 'alo',
                    inn: '780740192914',
                },
                date: '09.12.2012',
                number: '41473',
                contract: {
                    sum: 122989223.99,
                    number: '0138300000421001027',
                    link: 'https://finaxe.ru',
                },
                banks: [
                    {
                        name: 'втб',
                        idStatus: 1,
                        sum: 164888.00,
                    }
                ]
            },
            info: {
                title: 'Спец. счет ',
                description: 'description'
            }
        },
        {
            order:  {
                idStatus: 4,
                company: {
                    name: 'alo',
                    inn: '780740192914',
                },
                date: '09.12.2012',
                number: '41473',
                contract: {
                    sum: 122989223.99,
                    number: '0138300000421001027',
                    link: 'https://finaxe.ru',
                },
                banks: [
                    {
                        name: 'внешфинбанк',
                        idStatus: 1,
                        sum: 164888.00,
                    }
                ]
            },
            info: {
                title: 'Спец. счет ',
                label: 'Далее',
                description: 'description',
                iconDescription: 'placeholder'
            }
        },
        {
            order:  {
                idStatus: 5,
                date: '09.12.2012',
                number: '41473',
                company: {
                    name: 'alo',
                    inn: '780740192914',
                },
                contract: {
                    sum: 122989223.99,
                    number: '0138300000421001027',
                    link: 'https://finaxe.ru',
                },
                banks: [
                    {
                        name: 'волгамясомолторг',
                        idStatus: 1,
                        sum: 164888.00,
                    },
                    {
                        name: 'волгамясомолторг',
                        idStatus: 2,
                        sum: 114888.00,
                    },
                    {
                        name: 'волгамясомолторг',
                        idStatus: 2,
                        sum: 114888.00,
                    },
                    {
                        name: 'волгамясомолторг',
                        idStatus: 1,
                        sum: 114888.00,
                    },
                    {
                        name: 'волгамясомолторг',
                        idStatus: 3,
                        sum: 114888.00,
                    },
                ]
            },
            info: {
                title: 'Спец. счет ',
                label: 'Далее',
                description: 'description очень длинные текст',
                iconDescription: 'placeholder',
                promo: 'promo',
                iconPromo: 'placeholder',
                status: {
                    text: 'статус',
                    view: 'warning'
                }
            }
        },
    ]

    testClick():void {
        console.log(1)
    }

    onUpdateError(e: Event) : void{
        this.error = e
        console.log(e)
    }

    test(e: InputEvent){
        console.log(e)
        this.password = e
    }

    getBankLogo = getBankLogo
    getIconSvg = getIconSvg
    orderCardView = orderCardView

    progressBarValue = [0.5,0,0,0];

    progressBarStepsNames = ['Заполните личные данные', 'Заполните данные о компании', 'Заполните данные о сыне', 'Как с вами связаться']

    step = 1

    inputValue = ''

    layout: GridLayout['layout'] = [
        ['auto', 'auto', 'auto'],
        ['auto'],
        ['auto', 'auto', 'auto', 'auto'],
        ['75px', 'auto', 'auto'],
        ['auto', '73.5px', 'auto', 'auto'],
    ]

    inputForms = [
        {
            label: 'ИНН',
            placeholder: 'Введите номер',
        },
        {
            label: 'ОГРН',
            placeholder: 'Введите номер',
        },
        {
            label: 'КПП',
            placeholder: 'Введите номер',
        },
        {
            label: 'Наименование',
            placeholder: 'Введите наименование',
        },
        {
            label: 'Дата учёта',
            placeholder: 'дд.мм.гг',
        },
        {
            label: 'ОКТМО',
            placeholder: 'Введите номер',
        },
        {
            label: 'ОКОПФ',
            placeholder: 'Введите номер',
        },
        {
            label: 'Код субъекта РФ',
            placeholder: 'Введите код',
        },
        {
            label: 'Индекс',
            placeholder: '000000',
        },
        {
            label: 'Регион',
            placeholder: 'Введите регион',
        },
        {
            label: 'Город',
            placeholder: 'Введите город',
        },
        {
            label: 'Улица',
            placeholder: 'Введите улицу',
        },
        {
            label: 'Дом',
            placeholder: '№',
        },
        {
            label: 'Строение / корпус',
            placeholder: 'Введите номер',
        },
        {
            label: 'Квартира / Офис',
            placeholder: 'Введите номер',
        },
    ]

    get formatLayout() {
        const result: string[] = []
        this.layout.forEach(item => {result.push(...item)})
        return result
    }

    setValue(){
        const t = {
            1: [1,0.2,0,0],
            2: [1,1,0.5,0],
            3: [1,1,1,0.5],
            4: [1,1,1,1],
            5: [1,1,1,0.5],
            6: [1,1,0.444,0],
            7: [1,0.233,0,0],
            8: [0.788,0,0,0],
            9: [0,0,0,0],
        }

        this.progressBarValue = t[this.step]

        this.step += 1
    }


    toast = {
        view: 0,
        position: 0,
        listView: [
            {
                id: 0,
                text: 'base'
            },
            {
                id: 1,
                text: 'warning'
            },
            {
                id: 2,
                text: 'success'
            },
            {
                id: 3,
                text: 'error'
            }
        ],
        listPosition: [
            {
                id: 0,
                text: 'top-right'
            },
            {
                id: 1,
                text: 'top-left'
            },
            {
                id: 2,
                text: 'top-center'
            },
            {
                id: 3,
                text: 'bottom-right'
            },
            {
                id: 4,
                text: 'bottom-left'
            },
            {
                id: 5,
                text: 'bottom-center'
            }
        ]
    }


    showToast(){

        const mapViews = {
            0: 'base',
            1: 'warning',
            2: 'success',
            3: 'error'
        }

        const mapPosition = {
            0: 'top-right',
            1: 'top-left',
            2: 'top-center',
            3: 'bottom-right',
            4: 'bottom-left',
            5: 'bottom-center',
        }


        this.$toast({
            title: 'title',
            text: 'text',
            position: mapPosition[this.toast.position],
            view: mapViews[this.toast.view]
        })
    }
}
</script>

<style lang="scss">
.test {
    text-align: center;
    &__item{
        margin: 0 auto;
        text-align: left;
        //display: inline-block;
        //vertical-align: top;
    }
    &__cell{
        padding: 20px;
        display: inline-block;
        vertical-align: middle;
        max-width: 53.333rem;
        margin: 0 auto;
        min-width: 10rem;
        &--block{
            display: block;
        }
        &--align {
            &-top{
                vertical-align: top
            }
        }

        .progress-bar{
            width: 300px;
        }
    }
    &__row{
        margin: 10px;
    }
    &__title{
        font-size: 2rem;
        font-weight: 900;
        margin-top: 50px
    }

    .left {
        text-align: left;
    }
}
</style>
