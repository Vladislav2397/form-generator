import regulars from "./regulars";

export default function regexValidating(
    regex: keyof typeof regulars | RegExp,
    value: string | number | null
): boolean {
    try {
        if (!regex || !value) return false

        if (typeof regex === 'string')
            return regulars[regex].test(value.toString())
        else
            return regex.test(value.toString())
    } catch (error) {
        return false
    }
}
