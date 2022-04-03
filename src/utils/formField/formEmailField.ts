import FormSingleField, { FormSingleFieldOptions } from "./formSingleField"

import regulars from "../default/regulars"

export default class FormEmailField extends FormSingleField {
    constructor(props?: Partial<FormSingleFieldOptions>) {
        const defaultValues = {
            validRegex: regulars.email,
            optionals: {
                label: 'Электронная почта',
                placeholder: 'Введите адрес электронной почты'
            }
        }

        super({ ...defaultValues, ...props, })
    }

    errorTextCallback() {
        console.log('FormEmailField.errorTextCallback')

        if ( !this.value) {
            return 'Электронная почта не указана'
        }
        if ( !this.isValid()) {
            return 'Некорректный почтовый адресс'
        }
        return 'Пользователя с такой почтой не существует'
    }
}
