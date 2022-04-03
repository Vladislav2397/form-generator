export default function(px: number): number {
    let rem = 12
    if (window.innerWidth >= 400) rem = 13.2
    if (window.innerWidth >= 650) rem = 12
    if (window.innerWidth >= 1200) rem = window.innerWidth / 100
    if (window.innerWidth >= 1800) rem = 18

    return (px / 12) * rem
}