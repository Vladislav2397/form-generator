export default (...arrays: unknown[][]) => {
    const min = Math.min(...arrays.map(arr => arr.length))
    const result: any[] = []

    for (let index = 0; index < min; index++) {
        const item: any[] = []

        arrays.forEach(arr => {
            item.push(arr[index])
        })

        result.push(item)
    }

    return result
}
