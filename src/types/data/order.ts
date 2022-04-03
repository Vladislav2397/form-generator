import { Maybe } from '../utils/other'

export type Contract = {
    sum: string | number
    number: string | number
    link: string
}

export type CompanyItem = {
    id?: number | null
    inn: string
    name: string
    ogrn?: string
}

export type Company = {
    id: number
    general: {
        inn: Maybe<string>
        ogrn: Maybe<string>
        kpp: Maybe<string>
        registrationDate: Maybe<string>
        name: Maybe<string>
        taxId: Maybe<number>
        registrationAddress: Maybe<string>
        registrationPlace: Maybe<string>
        addressLegal: Maybe<string>
        addressPost: Maybe<string>
        addressFact: Maybe<string>
    }
    payment: {
        bik: Maybe<string>
        bankAccount: Maybe<string>
        bankName: Maybe<string>
        correspondentAccount: Maybe<string>
    }
    head: CompanyHead[]
    founders: {
        legals: FounderLegal[]
        individuals: FounderIndividual[]
    }
}

export type FounderIndividual = {
    id: number
    typeId: 2
    firstName: Maybe<string>
    secondName: Maybe<string>
    thirdName: Maybe<string>
    gender: number
    addressActual: Maybe<string>
    addressRegistration: Maybe<string>
    residentRf: number
    inn: Maybe<string>
    passportCode: Maybe<string>
    passportDate: Maybe<string>
    passportIssuedBy: Maybe<string>
    passportNumber: Maybe<string>
    passportBirthday: Maybe<string>
    passportBirthdayPlace: Maybe<string>

    part: Maybe<string>
}

export type FounderLegal = {
    id: number
    typeId: 1
    firstName: Maybe<string>
    secondName: Maybe<string>
    thirdName: Maybe<string>
    inn: Maybe<string>
    kpp: Maybe<string>
    ogrn: Maybe<string>
    part: Maybe<string>
    addressPost: Maybe<string>
    addressLegal: Maybe<string>
    addressActual: Maybe<string>
    registrationDate: Maybe<string>
    registrationPlace: Maybe<string>
}

export type CompanyHead = Omit<FounderIndividual, 'part' | 'typeId'> & {
    snils: Maybe<string>
    post: Maybe<string>
    postDate: Maybe<string>
    base: number
    phone: Maybe<string>
}

export type OrderBankType = {
    name: string
    idStatus: number
    sum: string | number
}
