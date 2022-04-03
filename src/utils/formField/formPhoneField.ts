import FormSingleField, {FormSingleFieldOptions} from "./formSingleField"

import regulars from "../default/regulars"

export default class FormPhoneField extends FormSingleField {
    constructor(props?: Partial<FormSingleFieldOptions>) {
        const defaultValues = {
            validRegex: regulars.phones,
            optionals: {
                label: 'Телефон',
                placeholder: '+7 900 000-00-00',
            }
        }

        super({ ...defaultValues, ...props })
    }

    errorTextCallback(): string {
        if ( !this.value?.toString().trim()) {
            return 'Номер телефона не указан'
        }
        return 'Некорректно введён номер телефона'
    }
}
