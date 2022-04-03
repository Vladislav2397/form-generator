import { IconSvgName, IconSvgView } from '../../types/utils/icons-svg'
import { banksNames } from '../../services/BankService'

export function getBankLogo(
    id: number,
    options?: {
        small?: boolean
        monochrome?: boolean
    },
) {
    const directory = '/images/banks'
    const sizeDirectory = options && options.small ? 'small' : 'big'
    const monochromeDirectory = options && options.monochrome ? 'monochrome' : 'normal'
    const name = banksNames[id]

    return `${directory}/${sizeDirectory}/${monochromeDirectory}/${name}.svg`
}

export function getIconSvg(name: IconSvgName, options: { view: IconSvgView } = { view: 'other' }) {
    const directory = `/images/icons/${options.view}`

    return `${directory}/${name}.svg`
}
