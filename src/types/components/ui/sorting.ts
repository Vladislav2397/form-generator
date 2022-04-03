export type SortingOption = {
    name: string
    id: number
}

export type SortingValue = {
    id: SortingOption['id'] | null
    reverse: boolean
}

export type Sorting = {
    value: SortingValue
    options: SortingOption[]
}
