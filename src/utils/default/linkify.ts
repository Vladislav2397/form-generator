import regexValidating from './regexValidating'

export default function (str: string) {
    return regexValidating('url', str) && !regexValidating('email', str)
}
