export default function (el: HTMLElement | Element) {
    const rect = el.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    return {
        x: rect.left >= 0 && rect.left + rect.width <= windowWidth,
        y: rect.top >= 0 && rect.bottom + rect.height <= windowHeight,
    }
}
