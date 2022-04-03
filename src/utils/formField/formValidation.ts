import FormSingleField from "./formSingleField"

type FormFieldRecord = Record<string, FormSingleField | any>

export default function isValid<T extends FormFieldRecord, K extends keyof T>(form: T, fieldsForValidate: K[]) {
    let isSuccess = true

    fieldsForValidate.forEach(key => {
        const result = form[key].isValid()

        console.log(`key ${key} of ${form[key].constructor.name}`, result)

        if ( !result) {
            form[key].error = true
            isSuccess = false
        }
    })

    return isSuccess
}
