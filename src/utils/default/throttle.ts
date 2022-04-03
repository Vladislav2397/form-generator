export function throttle(func: Function, delay: number) {
    let lastTime = 0
    return function (...args) {
        const now = Date.now()
        if (now - lastTime >= delay) {
            func(...args)
            lastTime = now
        }
    }
}
