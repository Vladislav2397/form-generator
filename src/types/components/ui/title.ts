import { SizePropsType, ViewPropsType } from '../../utils/helpers'

export type TitleSize = Extract<SizePropsType, 'xxs' | 'xs' | 's' | 'm' | 'l'>
export type TitleTag = 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type TitleView = Extract<ViewPropsType, 'base' | 'success' | 'secondary'>
