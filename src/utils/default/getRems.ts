export default function remFromPx(px: string | number) {
    return `${(+px / 12).toFixed(3)}`
}
