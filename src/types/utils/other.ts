import { ButtonView } from '../components/ui/button'
import { SelectOption } from '../components/ui/select'
import { IButtonProps } from '../../../components/ui/Button.vue'

export type PaginationOptions = {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
}

export type FiltersOptions = {
    text: string
    status: Maybe<SelectOption['id']>
    dateStart: {
        from: Maybe<string>
        to: Maybe<string>
    }
    dateEnd: {
        from: Maybe<string>
        to: Maybe<string>
    }
    sum: {
        from: Maybe<string>
        to: Maybe<string>
    }
    commission: {
        from: Maybe<string>
        to: Maybe<string>
    }
    banks: Maybe<SelectOption['id']>
}

export type ButtonItem = {
    callback: (...args) => void
    text?: string
    view?: IButtonProps['view']
    size?: IButtonProps['size']
    icon?: IButtonProps['icon']
    disabled?: IButtonProps['disabled']
    loading?: IButtonProps['loading']
}

export type Maybe<T> = null | T

export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
}
