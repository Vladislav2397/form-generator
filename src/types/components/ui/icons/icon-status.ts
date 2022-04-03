import { SizePropsType, ViewPropsType } from '../../../utils/helpers'

export type IconStatusView = Extract<ViewPropsType, 'system' | 'warning' | 'critical' | 'success'>
export type IconStatusSize = Extract<SizePropsType, 'm' | 'l'>
