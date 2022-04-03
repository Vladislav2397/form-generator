export type TableAccountingRowItem = {
    title: string
    code: string
    state: 'default' | 'strong'
    section_id: number
    quarter: string
    year: string
}

export type TableAccountingGroupItem = {
    groupName: string
    list: TableAccountingSubGroupItem[]
}

export type TableAccountingSubGroupItem = {
    groupName: string
    list: TableAccountingRowItem[]
}

export type TableAccountingData = {
    title: string
    head: string[]
    body: TableAccountingGroupItem[]
}
