export function wordEndByNumber(word: string, number: number | string, titles: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2]
    const formattedNumber = parseFloat(number.toString())
    return `${word}${
        titles[
            formattedNumber % 100 > 4 && formattedNumber % 100 < 20
                ? 2
                : cases[formattedNumber % 10 < 5 ? formattedNumber % 10 : 5]
        ]
    }`
}
