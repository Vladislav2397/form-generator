import FormSingleField, {FormSingleFieldOptions} from "./formSingleField"

import regulars from "../default/regulars"

export default class FormPasswordField extends FormSingleField {
    constructor(props?: Partial<FormSingleFieldOptions>) {
        const defaultValues = {
            validRegex: regulars.password,
            optionals: {
                label: 'Пароль',
                placeholder: 'Введите пароль',
            }
        }

        super({ ...defaultValues, ...props })
    }

    errorTextCallback() {
        if ( !this.value) {
            return 'Пароль не указан'
        }
        if ( this.value?.length < 6) {
            return 'Пароль менее 6 символов'
        }
        return 'Неверный пароль. Повторите попытку или нажмите на ссылку «Забыли пароль», чтобы сбросить его'
    }
}
