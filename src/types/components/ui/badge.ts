import { ViewPropsType } from '../../utils/helpers'

export type BadgeView = Extract<ViewPropsType, 'system' | 'warning' | 'critical' | 'success'>
export type BadgeSize = 'm'
