export function downloadFileByLink({ name, link }: { name: string; link: string }): void {
    const element = document.createElement('a')
    element.download = name
    element.target = '_blank'
    element.rel = 'noopener noreferrer'
    element.href = link
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}
