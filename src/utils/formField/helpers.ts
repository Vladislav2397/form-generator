export function makeGetter(obj: Object, getterName: string, func: () => string) {
    Object.defineProperty(obj, 'errorText', {
        get: func
    })
}

export function sum(...args: (string | number | boolean)[]) {
    if (args.length) {
        return +(args.reduce((t, i) => +(t) + +(i)))
    }
    return 0
}
