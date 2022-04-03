import { SizePropsType, TagPropsType, ViewPropsType } from '../../../utils/helpers'

export type SkeletonView = Extract<ViewPropsType, 'success' | 'secondary' | 'base'>
export type SkeletonSize = Extract<SizePropsType, 'xs' | 's' | 'm' | 'l' | 'xxl'>
export type SkeletonTag = Extract<TagPropsType, 'div' | 'strong'>
