export type Tags = 'div' | 'button' | 'router-link' | 'a'

export default function (tag: Tags, href?: string) {
    const optionsMap = {
        button: {
            role: 'button',
            type: 'button',
        },
        'router-link': {
            to: href,
        },
        a: {
            href,
            rel: 'noopener noreferrer',
            target: '_blank',
        },
    } as Record<Tags, unknown>

    return optionsMap[tag]
}
