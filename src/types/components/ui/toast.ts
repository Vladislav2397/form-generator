import { ViewPropsType } from '../../utils/helpers'

export type ToastView = Extract<ViewPropsType, 'base' | 'warning' | 'critical' | 'success'>
export type ToastPosition = 'top-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center'
