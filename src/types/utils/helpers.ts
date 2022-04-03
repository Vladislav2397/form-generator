export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never

export type SizePropsType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type ViewPropsType = 'base' | 'warning' | 'critical' | 'success' | 'system' | 'brand' | 'secondary'
export type DisabledPropsType = boolean | ''
export type TagPropsType = 'div' | 'a' | 'router-link' | 'button' | 'label' | 'strong'
export type DirectionPropsType = 'row' | 'column'
