export default (...numbers: number[]) => {
    return numbers.reduce(
        (total, num) => total + num,
        0
    )
}