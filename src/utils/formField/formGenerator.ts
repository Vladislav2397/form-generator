import FormSingleField from "./formSingleField"
import FormBooleanField from "./formBooleanField"

import regulars from "../default/regulars"

export const FormEmailField = () => new FormSingleField({
    validRegex: regulars.email,
    optionals: {
        label: 'Электронная почта',
        placeholder: 'Введите адрес электронной почты'
    },
    errorTextCallback() {
        console.log('FormEmailField.errorTextCallback')

        if ( !this.value) {
            return 'Электронная почта не указана'
        }
        if ( !((this.value ?? '').match(this.validRegex ?? /.+/)?.length)) {
            return 'Некорректный почтовый адресс'
        }
        return 'Пользователя с такой почтой не существует'
    }
})

export const FormCheckboxField = () => new FormBooleanField({
    value: false,
    error: false,
})

export const FormPhoneField = () => new FormSingleField({
    validRegex: regulars.phones,
    optionals: {
        label: 'Телефон',
        placeholder: '+7 900 000-00-00',
    },
    errorTextCallback() {
        return !this.value
            ? 'Номер телефона не указан'
            : 'Некорректно введён номер телефона'
    }
})

export const FormPasswordField = () => new FormSingleField({
    validRegex: regulars.password,
    optionals: {
        label: 'Пароль',
        placeholder: 'Введите пароль',
    },
    errorTextCallback() {
        if ( !this.value) {
            return 'Пароль не указан'
        }
        if ( this.value.length < 8) {
            return 'Пароль менее 8 символов'
        }
        return 'Неверный пароль. Повторите попытку или нажмите на ссылку «Забыли пароль», чтобы сбросить его'
    }
})

export const FormFirstnameField = () => new FormSingleField({
    validRegex: regulars.names,
    optionals: {
        label: 'Имя',
        placeholder: 'Введите имя',
    },
    errorTextCallback() {
        return !this.value
            ? 'Имя не указано'
            : 'Некорректно введено имя'
    }
})

export const FormLastnameField = () => new FormSingleField({
    validRegex: regulars.names,
    optionals: {
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
    },
    errorTextCallback() {
        if ( !this.value) {
            return 'Фамилия не указана'
        }
        return 'Некорректна введена фамилия'
    }
})

export const FormThirdNameField = () => new FormSingleField({
    validRegex: /.*/,
    optionals: {
        label: 'Отчество (необязательно)',
        placeholder: 'Введите отчество',
    },
})

export const FormAccountField = () => new FormSingleField({
    // @ts-ignore
    value: null,
    error: false,
    validRegex: /\d/,
})

export const FormRolesField = () => new FormSingleField({
    value: '1',
    error: false,
    validRegex: /.+/,
    optionals: {
        list: [
            {
                id: 1,
                text: 'Тендерный специалист'
            },
            {
                id: 2,
                text: 'Поставщик/Исполнитель',
            },
            {
                id: 3,
                text: 'Заказчик',
            },
            {
                id: 4,
                text: 'Представитель тендерной компании',
            },
            {
                id: 5,
                text: 'Бухгалтер/Закупщик в компании',
            },
            {
                id: 6,
                text: 'Другое',
            },
        ]
    }
})
