<template lang="pug">
    .b-auth-registration
        auth-registration-header-component.__header(
            :progress-bar-options="progressBarOptions"
            @back="changeStep('back')"
        )
        form.__form(
            ref="form"
            method="POST"
            :style="formStyles"
            :action="formAction"
        )
            input(
                :value="$csrfToken"
                name="_token"
                type="hidden"
            )
            transition(
                name="fade"
                mode="out-in"
                duration="400"
            )
                .__step(
                    ref="step"
                    key="1"
                    v-if="currentStep === 1"
                )
                    input(
                        :value="form.account.value"
                        name="accountType"
                        type="hidden"
                    )
                    card-info-component.__card(
                        v-for="userRole in userRoleCards"
                        :key="userRole.id"
                        :title="userRole.title"
                        :description="userRole.description"

                        @click="setAccountType(userRole.id)"
                    )
                .__step(
                    ref="step"
                    key="2"
                    v-else-if="currentStep === 2"
                )
                    input(
                        name="name"
                        type="hidden"
                        :value="`${form.lastname.value} ${form.firstname.value} ${form.thirdName.value}`"
                    )
                    input-component.__line(
                        v-model.trim="form.lastname.value"
                        :error.sync="form.lastname.error"
                        :errorText="form.lastname.errorText"
                        :label="form.lastname.optionals.label"
                        :placeholder="form.lastname.optionals.placeholder"
                        size="l"
                        name="secondName"
                    )
                    input-component.__line(
                        v-model.trim="form.firstname.value"
                        :error.sync="form.firstname.error"
                        :errorText="form.firstname.errorText"
                        :label="form.firstname.optionals.label"
                        :placeholder="form.firstname.optionals.placeholder"
                        size="l"
                    )
                    input-component.__line(
                        v-model.trim="form.thirdName.value"
                        :error.sync="form.thirdName.error"
                        :label="form.thirdName.optionals.label"
                        :placeholder="form.thirdName.optionals.placeholder"
                        size="l"
                        name="thirdName"
                    )
                .__step(
                    ref="step"
                    key="3"
                    v-else-if="currentStep === 3"
                )
                    input(
                        :value="roleValue"
                        name="role"
                        type="hidden"
                    )
                    radio-component.__line(
                        v-model="form.role.value"
                        name="user-role"
                        :options="form.role.optionals.list"
                    )
                .__step(
                    ref="step"
                    key="4"
                    v-else-if="currentStep === 4"
                )
                    input-component.__line(
                        v-model="form.email.value"
                        :error.sync="form.email.error"
                        :errorText="form.email.errorText"
                        :label="form.email.optionals.label"
                        :placeholder="form.email.optionals.placeholder"
                        @input="setChanged"
                        size="l"
                        name="email"
                    )
                    input-component.__line(
                        v-model="form.phone.value"
                        :error.sync="form.phone.error"
                        :errorText="form.phone.errorText"
                        :label="form.phone.optionals.label"
                        :placeholder="form.phone.optionals.placeholder"
                        mask="phone"
                        size="l"
                        name="phone"
                    )
                    input-password-component.__line(
                        v-model="form.password.value"
                        :error.sync="form.password.error"
                        :errorText="form.password.errorText"
                        :label="form.password.optionals.label"
                        size="l"
                    )
            //- Create inputs for send form.submit() with all fields
            input(
                v-for="formName in filteredFormNames"
                type="hidden"
                :key="formName"
                :name="mapFilteredFormNames[formName]"
                :value="form[formName].value"
            )
        transition(
            name="fade"
        )
            .__button-wrapper(
                v-if="isShowButton"
            )
                button-component.__button(
                    :key="buttonText"
                    :aria-label="buttonText"
                    size="l"
                    @click="changeStep('next')"
                ) {{ buttonText }}
        transition(
            name="fade"
        )
            .__privacy(
                v-if="isShowPrivacy"
            ) Нажимая кнопку «Зарегистрироваться», вы принимаете#[br]
                link-component(
                    href="/"
                    underline="none"
                    size="inherit"
                ) условия обработки персональных данных

</template>

<script lang="ts">
import {Component, Vue, Ref, Inject, Emit} from 'vue-property-decorator'

import api from "../../../js/api"
import {urls} from "../../../js/api/auth"

import AuthRegistrationHeader, {AuthRegistrationHeaderProps} from './AuthRegistrationHeader.vue'
import CardInfo, {CardInfoProps} from "../../ui/cards/CardInfo.vue"

import { CsrfTokenProviderValue } from "../../../js/providers/csrfToken"
import { onKeydown } from "../../../js/utils/default/keydown"
import { throttle } from "../../../js/utils/default/throttle"

import {
    FormEmailField,
    FormPhoneField,
    FormPasswordField,
    FormFirstnameField,
    FormLastnameField,
    FormRolesField,
    FormThirdNameField,
    FormAccountField,
} from "../../../js/utils/formField/formGenerator"
import {Maybe} from "../../../js/types/utils/other";

type UserRoleCard = {
    title: CardInfoProps['title'],
    description: CardInfoProps['description'],
    id: 5 | 6
}

const mapFields = Object.freeze({
    1: [],
    2: ['firstname', 'lastname'],
    3: ['role'],
    4: ['email', 'phone', 'password']
})

@Component({
    components: {
        'auth-registration-header-component': AuthRegistrationHeader,
        'card-info-component': CardInfo,
    }
})
export default class AuthRegistration extends Vue {
    @Ref('form') formRef!: HTMLFormElement
    @Ref('step') stepRef!: HTMLElement
    @Inject('$csrfToken') $csrfToken!: CsrfTokenProviderValue

    @Emit('back') backEmit() { /**/ }

    isSubmitFlag = false
    currentStep = 1
    formAction = urls.register

    form = {
        account: FormAccountField(),
        lastname: FormLastnameField(),
        firstname: FormFirstnameField(),
        thirdName: FormThirdNameField(),
        role: FormRolesField(),
        email: FormEmailField(),
        phone: FormPhoneField(),
        password: FormPasswordField(),
    }

    mapFilteredFormNames = {
        account: 'user_role_id',
        lastname: 'second_name',
        firstname: 'first_name',
        thirdName: 'third_name',
        role: 'user_position',
    }

    userRoleCards: UserRoleCard[] = [
        {
            title: 'Клиент',
            description: 'Получайте банковские продукты для своей компании или как Индивидуальный Предприниматель',
            id: 5
        },
        {
            title: 'Агент',
            description: 'Оформляйте банковские продукты и контролируйте процесс выпуска для своих клиентов',
            id: 6
        }
    ]

    isChanged = false

    setChanged() {
        this.isChanged = true
    }

    timeoutClearStyles = {} as ReturnType<typeof setTimeout>
    timeoutSetHeight = {} as ReturnType<typeof setTimeout>

    formStyles = {
        height: null as Maybe<string>,
        transition: null as Maybe<string>,
        'will-change': null as Maybe<string>
    }

    get fieldsFilteredByStep() {
        return this.formAsList.filter(
            ([key]) => mapFields[this.currentStep].includes(key)
        )
    }

    get formAsList() {
        return Object.entries(this.form)
    }

    get roleValue(){
        return this.form.role.value !== null
            ? this.form.role.optionals.list?.find(
                role => role.id === +(this.form.role.value ?? '')
            )?.text
            : ''
    }

    async isEmailExists(): Promise<boolean> {
        const response = await api.checkEmail(this.form.email.value)

        return response?.exists ?? false
    }

    setAccountType (id: UserRoleCard["id"]): void {
        this.form.account.value = `${id}`
        this.changeStep('next')
    }

    get filteredFormNames() {
        return Object.keys(this.form).filter(key => !['email', 'password', 'phone'].includes(key))
    }

    changeStep(direction: 'back' | 'next') {

        if (direction === 'next') {
            this.validateFieldsByStep()
        }

        const isValidStep = this.isValidStep()

        const isPreventFormAnimation = direction === 'next' && !isValidStep

        this.setFormStyles(isPreventFormAnimation).then(() => {
            if (direction === 'back') {
                if (this.currentStep > 1) {
                    this.currentStep -= 1
                } else {
                    this.backEmit()
                }
            } else if (direction === 'next' && isValidStep) {
                if (this.currentStep < 4) {
                    this.currentStep += 1
                } else {
                    this.sendForm()
                }
            }
        })
    }

    validateFieldsByStep() {
        this.fieldsFilteredByStep.forEach(([, formField]) => formField.validate())
    }

    isValidStep(): boolean {
        return this.fieldsFilteredByStep.every(
            ([, formField]) => !formField.error
        )
    }

    sendForm() {
        this.isEmailExists().then(isExists => {
            if (!isExists) {
                console.log('send form')
                // this.formRef?.submit()
            } else {
                this.form.email.error = true
            }
        })
    }

    get isShowButton() {
        return this.currentStep > 1
    }

    get isShowPrivacy (){
        return this.currentStep === 4
    }

    get buttonText() {
        return this.currentStep !== 4 ? 'Продолжить' : 'Зарегистрироваться'
    }

    get progressBarValue() {
        const startStepValue = 0.2

        return Array(4).fill(0).map((value, index) => {
            if (index + 1 < this.currentStep) {
                return 1
            } if (this.currentStep === index + 1){
                const inputProgressValue = mapFields[this.currentStep].length
                    ? (1 - startStepValue) / mapFields[this.currentStep].length
                    : 0

                return mapFields[this.currentStep].reduce((total, field) => {
                    const conditionForProgress = field === 'phone' && this.form[field].value && this.form[field].value!.toString().length > 3 || field !== 'phone' && this.form[field].value

                    return total + (conditionForProgress ? inputProgressValue : 0)
                },  startStepValue)
            }
            return 0
        })
    }

    get progressBarOptions(): AuthRegistrationHeaderProps['ProgressBarOptions'] {
        return {
            value: this.progressBarValue,
            stepsNames: ['Выберите тип аккаунта', 'Введите личные данные', 'Выберите свой вариант', 'Введите контактные данные']
        }
    }

    setFormStyles(prevent: boolean) {
        return new Promise(resolve => {
            if(prevent) {
                resolve(true)
            } else {
                const duration = 150

                this.formStyles = {
                    height: this.stepRef ? `${this.stepRef.scrollHeight}px` : null,
                    transition: `${duration/1000}s ease-out height`,
                    'will-change': 'height'
                }

                resolve(true)
                clearTimeout(this.timeoutSetHeight)
                this.timeoutSetHeight = setTimeout(()=>{
                    this.formStyles.height = this.stepRef ? `${this.stepRef.scrollHeight}px` : null
                    clearTimeout(this.timeoutClearStyles)
                    this.timeoutClearStyles = setTimeout(()=>{
                        this.formStyles = {
                            height: null,
                            transition: null,
                            'will-change': null
                        }
                    },duration)
                }, 440)
            }
        })
    }

    throttledKeydownCallback = throttle(this.onKeydownCallback, 440 + 150)

    onKeydownCallback(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'enter',
                callback: () => this.currentStep !== 1 && this.changeStep('next')
            },
            {
                key: 'esc',
                callback: () => this.changeStep('back')
            }
        ])
    }

    addEvents() {
        document.addEventListener('keydown', this.throttledKeydownCallback, {passive: true})
    }

    removeEvents() {
        document.removeEventListener('keydown', this.throttledKeydownCallback)
    }

    mounted() {
        this.addEvents()
    }

    beforeDestroy() {
        clearTimeout(this.timeoutClearStyles)
        clearTimeout(this.timeoutSetHeight)

        this.removeEvents()
    }
}
</script>
