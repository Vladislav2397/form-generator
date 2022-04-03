import { SizePropsType, ViewPropsType } from '../../utils/helpers'

export type SpinnerView = Exclude<ViewPropsType, 'secondary'>
export type SpinnerSize = SizePropsType
