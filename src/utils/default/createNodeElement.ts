export function hasClass(el: Element, cls: string) {
    return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(el: Element, cls: string) {
    if (!hasClass(el, cls)) el.className += ' ' + cls
}

export function removeClass(el, cls) {
    if (hasClass(el, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}

export default function createNodeElement({
    tag = 'div',
    text = '',
    classList = [],
    attributes = null,
    listeners = [],
}: {
    tag?: string
    text?: string
    classList?: string[]
    attributes?: Record<string, string> | null
    listeners?: {
        name: string
        callback: () => void
        options?: Record<string, unknown>
    }[]
}): HTMLElement | HTMLButtonElement {
    const element = document.createElement(tag)
    element.innerHTML = text
    addClass(element, classList.join(' '))

    if (attributes) {
        Object.entries(attributes).forEach(attribute => {
            element.setAttribute(attribute[0], attribute[1])
        })
    }

    if (listeners.length) {
        listeners.forEach(listener => {
            element.addEventListener(listener.name, listener.callback, listener.options)
        })
    }

    return element
}
