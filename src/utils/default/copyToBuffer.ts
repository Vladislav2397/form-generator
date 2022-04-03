export default function (value: string | number): void {
    const el: HTMLTextAreaElement = document.createElement('textarea')
    el.value = value.toString()
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    let selected: boolean | Range = false
    const selection = document.getSelection()

    if (selection) {
        selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
    }

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected && selection) {
        selection.removeAllRanges()
        selection.addRange(selected)
    }
}
