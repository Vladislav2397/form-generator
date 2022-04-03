import FormSingleField, {FormSingleFieldOptions} from "./formSingleField"

import regulars from "../default/regulars"

/**
 * @deprecated
 * use functions from formGenerator.ts
 */
export default class FormNameField extends FormSingleField {
    constructor(props?: Partial<FormSingleFieldOptions>) {
        const defaultValues = {
            validRegex: regulars.names, optionals: {
                label: 'Имя',
                placeholder: 'Введите имя',
            }
        }

        super({ ...defaultValues, ...props })
    }

    errorTextCallback() {
        if ( !this.value) {
            return 'Имя не указано'
        }
        return 'Некорректно введено имя'
    }
}
