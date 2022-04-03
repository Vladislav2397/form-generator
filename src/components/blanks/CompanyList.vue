<template lang="pug" >
    .b-company-list
        input-component.__input(
            ref="input"
            v-model="search.value"
            :size="search.optionals.size"
            :iconLeft="search.optionals.iconLeft"
            :error.sync="search.error"
            :errorText="search.errorText"
            :placeholder="inputPlaceholder"
            :loading="search.optionals.loading"
            :mask="inputMask"
            :disabled="search.optionals.disabled"
            clearable
            @input="onSearch"
        )
        transition(
            name="fade"
            mode="out-in"
        )
            button-component.__button(
                v-if="isShowAddButton"
                :disabled="isDisabledButton"
                aria-label="Добавить новую компанию"
                size="l"
                view="secondary-brand"
                icon="plus"
                icon-left
                @click="onClickAddCompany"
            ) Добавить новую компанию
        transition(
            name="fade"
            mode="out-in"
        )
            template(
                v-if="isShowFilteredList"
            )
                transition-group.__content(
                    v-if="isShowList"
                    key="default"
                    tag="div"
                    name="list-item-move"
                )
                    .__item.list-item-move(
                        v-for="company in companies"
                        :key="company.id"
                    )
                        card-info-component.__card(
                            v-bind="getCardProps(company)"
                            :key="company.id"
                            :title="company.name"
                            :loading="loadingCompanyId === company.id"
                            @click="onCardClick(company)"
                        )
                .__content(
                    v-else
                    key="skeleton"
                )
                    .__item(
                        v-for="(_, index) in 8"
                    )
                        skeleton-card-info-component.__card(
                            :key="index"
                            :items="['label']"
                        )
            response-component.__response(
                v-else-if="isShowResponse"
                :key="status"
                v-bind="responseOptions"
            )
                icon-status-component(
                    v-if="isShowResponseIcon"
                    size="l"
                )
</template >

<script lang="ts" >
import { Component, Emit, Inject, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import { CompanyItem } from '../../js/types/data/order'
import CardInfo from '../ui/cards/CardInfo.vue'
import SkeletonCardInfo from '../ui/skeletons/SkeletonCardInfo.vue'
import { DeviceProviderValue } from '../../js/providers/device'
import { IResponseProps } from './Response.vue'
import api from '../../js/api'
import FormSingleField from '../../js/utils/formField/formSingleField'
import regulars from '../../js/utils/default/regulars'
import { ModalsSetActiveAction } from '../../js/store/modules/modals/actions'
import { modals } from '../../js/store/modules/modals/state'
import { errorToaster } from '../../js/vue-utils/toast'
import { AppError } from '../../js/utils/errorHandler/error'
import { Action } from '../../js/decorators'


export interface ICompanyListProps {
    list: CompanyItem[] | null
    callbackOnAdd?: (...args) => void
    loading?: boolean
}

const modes = {
    SEARCH: 'SEARCH' as const,
    ADD: 'ADD' as const,
}

type Mode = keyof typeof modes

const statuses = {
    SEARCH_DEFAULT: 'SEARCH_DEFAULT' as const,
    SEARCH_LIST_NOT_FOUND: 'SEARCH_LIST_NOT_FOUND' as const,
    API_NOT_FOUND: 'API_NOT_FOUND' as const,
    API_SEARCH: 'API_SEARCH' as const,
    ADD_DEFAULT: 'ADD_DEFAULT' as const,
    API_FOUND: 'API_FOUND' as const,
    API_COMPANY_EXIST: 'API_COMPANY_EXIST' as const,
}

type Status = keyof typeof statuses

@Component({
    components: {
        'card-info-component': CardInfo,
        'skeleton-card-info-component': SkeletonCardInfo,
    },
})
export default class CompanyList extends Vue {
    // TODO Сделать фокус в инпут на нажатие любой кнопки
    // TODO Если нажали поиск компании и ввели ИНН той компании, которая уже есть, возвращаться к поиску по своим компаниями и фильтровать

    @Action('modals/setActive') openModal!: ModalsSetActiveAction

    @Prop() readonly list!: ICompanyListProps['list']
    @Prop() readonly callbackOnAdd!: ICompanyListProps['callbackOnAdd']
    @Prop() readonly loading!: ICompanyListProps['loading']

    @Inject('$device') $device!: DeviceProviderValue

    @Emit('choose') chooseEmit(data) {/**/}
    @Emit('sendCompanyId') sendCompanyIdEmit(id) {/**/}

    @Ref('input') inputRef!: Vue

    typing = false
    typingTimeout
    readonly typingDelay = 500

    statuses = statuses
    modes = modes
    status: Status = statuses.SEARCH_DEFAULT
    mode: Mode = modes.SEARCH

    loadingCompanyId: null | number = null

    setStatus(status: Status) {
        this.status = status
    }

    isActiveStatus(status: Status | Status[]): boolean {
        if (Array.isArray(status)) {
            return status.includes(this.status)
        }

        return this.status === status
    }

    setMode(mode: Mode) {
        this.mode = mode
        this.setStatus(this.isActiveMode(modes.SEARCH) ? statuses.SEARCH_DEFAULT : statuses.ADD_DEFAULT)
    }

    isActiveMode(mode: Mode) {
        return this.mode === mode
    }

    setLoadingCompanyId(id: null | number) {
        this.loadingCompanyId = id
    }


    filteredList = this.list

    companyFromApi: CompanyItem | null = null

    search = new FormSingleField({
        validRegex: regulars.inn,
        optionals: {
            iconLeft: 'search',
            size: 'l',
            loading: false,
            disabled: false,
        },
        errorTextCallback: () => this.errorText(),
    })

    errorText() {
        return this.isActiveStatus(this.statuses.API_SEARCH) ? 'Не правильный формат ИНН. ИНН может быть 10 или 12 цифр.' : ''
    }

    onSearch() {
        this.typing = true
        clearTimeout(this.typingTimeout)

        this.typingTimeout = setTimeout(() => {
            this.typing = false
            this.onSearchActions()
        }, this.typingDelay)
    }

    onSearchActions() {
        this.setFilteredList()
        this.companyFromApi = null
        if (this.search.isFilled()) {
            if (this.isActiveMode(modes.SEARCH)) {
                if (this.filteredList && this.filteredList.length === 0) {
                    this.search.validate()
                    if (this.search.value?.toString().match(regulars.numbers)?.length) {
                        this.setStatus(statuses.API_SEARCH)
                        this.search.validate()
                        if (!this.search.error) {
                            this.searchCompanyInApi()
                        }
                    } else {
                        this.setStatus(statuses.SEARCH_LIST_NOT_FOUND)
                    }
                } else {
                    this.setStatus(statuses.SEARCH_DEFAULT)
                }
            } else {
                this.search.validate()
                if (this.search.value?.toString().match(regulars.numbers)?.length) {
                    this.setStatus(statuses.API_SEARCH)
                    if (!this.search.error) {
                        this.searchCompanyInApi()
                    }
                }
            }
        } else {
            this.setStatus(this.isActiveMode(modes.SEARCH) ? statuses.SEARCH_DEFAULT : statuses.ADD_DEFAULT)
        }
    }

    setFilteredList() {
        if (this.search.value !== null) {
            const search = this.search.value.toString().toLowerCase()
            this.filteredList = this.search.value && this.list ? this.list.filter(company => {
                const inn = company.inn.toLowerCase()
                const name = company.name.toLowerCase()
                return ~inn.indexOf(search) || ~name.indexOf(search)
            }) : this.list
        }
    }

    setSearchLoading(value) {
        this.search.optionals.loading = value
        this.search.optionals.disabled = value
    }

    async searchCompanyInApi() {
        this.setSearchLoading(true)
        try {
            const {data, error} = await api.searchCompany(this.search.value!)
            if (data.search.inn) {
                this.companyFromApi = {
                    id: (new Date).getMilliseconds(),
                    ...data.search,
                }

                if (error) {
                    this.setStatus(statuses.API_COMPANY_EXIST)
                } else {
                    this.setStatus(statuses.API_FOUND)
                }
            } else {
                this.setStatus(statuses.API_NOT_FOUND)
            }
        } catch (e) {
            this.setStatus(statuses.API_NOT_FOUND)
            errorToaster(e as AppError)

        } finally {
            this.setSearchLoading(false)
        }
    }


    clearSearch() {
        this.search.value = ''
        this.search.error = false
        this.companyFromApi = null
        this.setMode(modes.SEARCH)
        this.setFilteredList()
    }

    getCardProps(company: CompanyItem) {
        if (this.isCardViewFromApi) {
            return {
                description: `ИНН\u00A0${company.inn}\u00A0\u00A0\u00A0${company.ogrn ? `ОГРНИП\u00A0${company.ogrn}` : ''}`,
                ...this.isActiveStatus(statuses.API_FOUND) && {
                    label: 'Добавить компанию',
                },
                disabled: this.isActiveStatus(statuses.API_COMPANY_EXIST),
            }
        }
        return {
            ...this.$device.size.mobile && {
                description: `ИНН ${company.inn}`,
            },
            ...!this.$device.size.mobile && {
                label: `ИНН ${company.inn}`,
            },
        }
    }

    setInputFocus() {
        const inputEl = this.inputRef.$el.querySelector('input')
        inputEl?.focus()
    }

    async onCardClick(company: CompanyItem) {
        switch (this.status) {
            case statuses.SEARCH_DEFAULT:
                await this.onChooseCompany(company.id!)
                break
            case statuses.API_FOUND:
                await this.onAddCompany(company)
                break
            default:
                break
        }
    }


    onClickAddCompany() {
        this.setMode(modes.ADD)
        this.setInputFocus()
    }

    async onAddCompany(company: CompanyItem) {
        try {
            this.setLoadingCompanyId(company.id!)
            const {id} = await api.addCompany(company.inn)
            const {data} = await api.getCompany(id)

            await this.openModal({
                name: modals.ADD_COMPANY,
                payload: {
                    companyData: data,
                },
                ...this.callbackOnAdd && {
                    callbackOnClose: this.callbackOnAdd,
                },
            })
        } catch (e) {
            errorToaster(e as AppError)
        } finally {
            this.setLoadingCompanyId(null)
        }
    }

    async onChooseCompany(id: number) {
        try {
            this.setLoadingCompanyId(id)

            const { data } = await api.getCompany(id)
            this.sendCompanyIdEmit(id)
            this.chooseEmit(data)

            // FIXME: For remove
            if (this.callbackOnAdd) {
                this.callbackOnAdd()
            }
            // =====
        } catch(error) {
            console.error(error)
        } finally {
            this.setLoadingCompanyId(null)
        }
    }


    get isCardViewFromApi() {
        return this.isActiveStatus([statuses.API_FOUND, statuses.API_COMPANY_EXIST, statuses.ADD_DEFAULT])
    }

    get companies() {
        if (this.isActiveMode(modes.ADD)) {
            return this.companyFromApi ? [this.companyFromApi] : []
        }

        return this.isCardViewFromApi && this.companyFromApi ? [this.companyFromApi] : this.filteredList
    }

    get responseOptions() {
        const responseOptions: IResponseProps = {
            title: '',
            description: '',
            buttons: [],
        }

        switch (this.status) {
            case statuses.API_NOT_FOUND:
                responseOptions.title = 'По вашему запросу нет компаний'

                if (!this.isPropsListEmpty) {
                    responseOptions.buttons = [
                        {
                            text: 'Показать мои компании',
                            callback: this.clearSearch,
                            view: 'secondary-brand',
                        },
                    ]
                }

                break
            case statuses.SEARCH_LIST_NOT_FOUND:
                responseOptions.title = 'По вашему запросу нет компаний'
                responseOptions.description = 'Введите ИНН для добавления новой компании или измените запрос'
                if (!this.isPropsListEmpty) {
                    responseOptions.buttons = [
                        {
                            text: 'Показать мои компании',
                            callback: this.clearSearch,
                            view: 'secondary-brand',
                        },
                    ]
                }

                break
            case statuses.ADD_DEFAULT:
                responseOptions.title = 'Для добавления компании введите ИНН'
                if (!this.isPropsListEmpty) {
                    responseOptions.buttons = [
                        {
                            text: 'Показать мои компании',
                            callback: this.clearSearch,
                            view: 'secondary-brand',
                        },
                    ]
                }
                break
            case statuses.API_FOUND:
                if (!this.isPropsListEmpty) {
                    responseOptions.title = 'Это не ваша компания?'
                    responseOptions.buttons = [
                        {
                            text: 'Показать мои компании',
                            callback: this.clearSearch,
                            view: 'secondary-brand',
                        },
                    ]
                }
                break
            case statuses.API_COMPANY_EXIST:
                responseOptions.title = 'Эта компания уже закреплена за другим пользователем сервиса'
                if (!this.isPropsListEmpty) {
                    responseOptions.buttons = [
                        {
                            text: 'Написать в поддержку',
                            callback: window._teletypeWidget.show,
                            view: 'secondary-brand',
                        },
                    ]
                }
                break
            default:
                break
        }

        return responseOptions
    }

    get isPropsListEmpty() {
        return this.list && this.list.length === 0
    }

    get inputPlaceholder() {
        return this.isPropsListEmpty ? 'Поиск по ИНН' : 'Поиск по ИНН или названию компании'
    }

    get inputMask() {
        return this.isPropsListEmpty ? 'inn' : null
    }

    get isShowResponse() {
        return Boolean(this.responseOptions.title && this.isActiveStatus([statuses.SEARCH_LIST_NOT_FOUND, statuses.API_NOT_FOUND, statuses.API_FOUND, statuses.API_COMPANY_EXIST, statuses.ADD_DEFAULT]))
    }

    get isShowResponseIcon() {
        return this.isActiveStatus(statuses.ADD_DEFAULT)
    }

    get isShowAddButton() {
        return this.isActiveMode(modes.SEARCH) && this.isActiveStatus(statuses.SEARCH_DEFAULT)
    }

    get isDisabledButton() {
        return this.loading
    }

    get isShowList() {
        return Boolean(!this.loading && this.list?.length)
    }

    get isShowFilteredList() {
        return this.companies && this.companies.length && !this.search.optionals.loading || this.loading
    }

    @Watch('list')
    onChangeList(newValue, prevValue) {
        if (newValue && !prevValue) {
            this.filteredList = this.list
        }
    }

    created() {
        this.setMode(this.isPropsListEmpty ? modes.ADD : modes.SEARCH)
    }

    mounted() {
        if (this.isPropsListEmpty) {
            this.setInputFocus()
        }
    }

    modals = Object.freeze(modals)
}

</script >
