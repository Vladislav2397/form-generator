import { SizePropsType, TagPropsType } from '../../utils/helpers'

export type ButtonView =
    | 'brand'
    | 'secondary-brand'
    | 'outline-brand'
    | 'flat-brand'
    | 'critical'
    | 'success'
    | 'warning'
    | 'flat'
export type ButtonSize = Extract<SizePropsType, 's' | 'm' | 'l'>
export type ButtonTag = Extract<TagPropsType, 'button' | 'a' | 'router-link'>
export type ButtonType = 'button' | 'submit'
