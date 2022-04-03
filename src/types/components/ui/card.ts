import { SizePropsType, TagPropsType, ViewPropsType } from '../../utils/helpers'

export type CardView = Extract<ViewPropsType, 'base' | 'warning' | 'critical' | 'success'> | 'primary'
export type CardTag = TagPropsType
export type CardSize = Extract<SizePropsType, 'l' | 'm'>
export type CardBorderStyle = 'solid' | 'dashed'
export type CardBackground = 'surface' | 'base'
