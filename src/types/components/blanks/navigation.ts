import { IconSvgName } from '../../utils/icons-svg'

export type NavigationMenuItem = {
    path: string
    name: string
    icon: IconSvgName
    count?: number
    update: boolean
}
export type NavigationMenuGroup = {
    list: NavigationMenuItem[]
}
