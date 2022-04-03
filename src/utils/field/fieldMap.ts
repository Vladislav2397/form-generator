export const fieldMap = {
    firstname: {
        label: 'Имя',
        placeholder: 'Введите имя',
        name: 'firstname',
    },
    lastname: {
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
        name: 'lastname',
    },
    thirdName: {
        label: 'Отчество',
        placeholder: 'Введите отчество',
        name: 'thirdName',
    },
    inn: {
        label: 'ИНН',
        placeholder: 'Введите ИНН',
        mask: 'inn',
    },
    ogrn: {
        label: 'ОГРН',
        placeholder: 'Введите номер',
        mask: 'number',
    },
    kpp: {
        label: 'КПП',
        placeholder: 'Введите номер',
        mask: 'number',
    },
    part: {
        label: 'Доля. %',
        placeholder: 'Введите долю учредителя',
    },
    registrationDate: {
        label: 'Дата регистрации',
        placeholder: 'дд.мм.гггг',
        position: 'right',
    },
    name: {
        label: 'Сокращённое наименование',
        placeholder: 'Введите сокращённое наименование',
    },
    taxId: {
        label: 'Система налогообложения',
    },
    gender: {
        label: 'Пол',
        options: [
            { id: 0, text: 'Мужской' },
            { id: 1, text: 'Женский' },
        ],
        name: 'gender',
        direction: 'row',
    },
    citizenship: {
        label: 'Гражданство РФ',
        options: [
            { id: 0, text: 'Резидент' },
            { id: 1, text: 'Не резидент' },
        ],
        name: 'citizenship',
        direction: 'row',
    },
    registrationAddress: {
        label: 'Адрес регистрирующего органа',
        placeholder: 'Введите адрес',
    },
    registrationPlace: {
        label: 'Наименование регистрирующего органа',
        placeholder: 'Введите наименование',
    },
    addressLegal: {
        label: 'Юридический адрес',
        placeholder: 'Введите адрес',
    },
    checkPost: {
        label: 'Почтовый адрес совпадает с юридическим',
    },
    addressPost: {
        label: 'Почтовый адрес',
        placeholder: 'Введите адрес',
    },
    checkFact: {
        label: 'Фактический адрес совпадает с почтовым',
    },
    addressFact: {
        label: 'Фактический адрес',
        placeholder: 'Введите адрес',
    },
    passportNumber: {
        label: 'Серия и номер',
        placeholder: '0000 000000',
        mask: 'passport',
    },
    passportBirthday: {
        label: 'Дата рождения',
        placeholder: 'дд.мм.гг',
        mask: 'date',
    },
    passportPlace: {
        label: 'Место рождения',
        placeholder: 'Введите город',
    },
    passportDate: {
        label: 'Дата выдачи',
        placeholder: 'дд.мм.гг',
        mask: 'date',
    },
    passportCode: {
        label: 'Код подразделения',
        placeholder: 'Введите номер',
        mask: 'passportCode',
    },
    passportCity: {
        label: 'Кем выдан',
        placeholder: 'Введите город',
    },
    passportAddress: {
        label: 'Адрес регистрации',
        placeholder: 'Введите адрес',
    },

    founderType: {
        options: [
            { id: 0, text: 'Физическое лицо' },
            { id: 1, text: 'Юридическое лицо' }
        ],
        name: 'type',
        direction: 'row'
    },

    auctionNumber: {
        label: 'Номер аукциона',
        placeholder: 'Введите номер аукциона',
        mask: 'number',
        loading: false,
        size: 'l',
    },
    financeProductId: {
        label: 'Тип банковской гарантии',
        placeholder: 'Выберите тип',
        options: [],
        size: 'l',
    },
    auctionDate: {
        label: 'Срок предоставления',
        placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
        size: 'l',
    },
    auctionSum: {
        label: 'Сумма гарантии, ₽',
        placeholder: 'Введите сумму',
        mask: 'decimal',
        size: 'l',
    },
    proposedPrice: {
        label: 'Итоговая цена контракта, ₽',
        placeholder: 'Введите цену',
        mask: 'decimal',
        size: 'l',
    },

    nmck: {
        label: 'НМЦК, ₽',
        placeholder: 'Введите цену',
        mask: 'decimal',
        size: 'l',
    },
    lotCount: {
        label: 'Количество лотов',
        placeholder: 'Введите количество',
        mask: 'number',
        size: 'l',
    },
    publishDate: {
        label: 'Дата публикации аукциона',
        placeholder: 'дд.мм.гггг',
        size: 'l',
    },
    iku: {
        label: 'ИКУ',
        placeholder: 'Введите 36-значный код',
        mask: 'iku',
        size: 'l',
    },
    ikz: {
        label: 'ИКЗ',
        placeholder: 'Введите 36-значный код',
        mask: 'ikz',
        size: 'l',
    },
    cooperative: {
        label: 'Совместная закупка',
        size: 'l',
    },
    closedTender: {
        label: 'Закрытый тендер',
        size: 'l',
    },
    okpd2: {
        label: 'ОКПД2',
        placeholder: 'Укажите классификацию',
        mask: 'okpd2',
        size: 'l',
    },
    link: {
        label: 'Ссылка на конкурсную процедуру',
        placeholder: 'Введите ссылку',
        size: 'l',
    },
    region: {
        label: 'Регион оказания услуг',
        placeholder: 'Введите регион',
        size: 'l',
    },
    subjectContract: {
        label: 'Предмет контракта',
        placeholder: 'Введите предмет контракта',
        size: 'l',
    },
    protocolName: {
        label: 'Наименование протокола',
        placeholder: 'Введите наименование',
        size: 'l',
    },
    protocolNumber: {
        label: 'Номер протокола',
        placeholder: 'Введите номер',
        mask: 'number',
        size: 'l',
    },
    protocolDate: {
        label: 'Дата протокола итогов',
        placeholder: 'дд.мм.гггг',
        mask: 'date',
        size: 'l',
    },

    isAddressEquals: {
        label: 'Фактический адрес совпадает с адресом регистрации',
    },
    isPublic: {
        label: 'Не является публичным должностным лицом',
    }
}

export const fieldComponents: Record<string, (keyof typeof fieldMap)[]> = {
    'input': [
        'inn',
        'ogrn',
        'kpp',
        'name',
        'registrationAddress',
        'registrationPlace',
        'addressLegal',
        'addressPost',
        'addressFact',
        'firstname',
        'lastname',
        'thirdName',
        'part',
        'passportNumber',
        'passportPlace',
        'passportCode',
        'passportCity',
        'passportAddress',
        'auctionNumber',
        'auctionSum',
        'proposedPrice',
        'nmck',
        'lotCount',
        'ikz',
        'iku',
        'okpd2',
        'link',
        'region',
        'subjectContract',
        'protocolNumber',
        'protocolDate',
        'protocolName',
    ],
    'input-datepicker': [
        'registrationDate',
        'passportBirthday',
        'passportDate',
        'publishDate',
    ],
    'card-checkbox': [
        'checkPost',
        'checkFact',
        'isAddressEquals',
        'isPublic',
        'cooperative',
        'closedTender',
    ],
    'radio': [
        'taxId',
        'gender',
        'citizenship',
        'founderType',
    ],
    'input-multi-datepicker': [
        'auctionDate',
    ],
    'select': [
        'financeProductId'
    ]
}

const makeFieldsData = () => {
    const fieldsData = {}

    Object
        .entries(fieldMap)
        .forEach(([fieldName, fieldProps]) => {
            const componentType = Object.entries(fieldComponents).find(
                ([, fieldKeys]) => fieldKeys.includes(fieldName as keyof typeof fieldMap)
            )

            fieldsData[fieldName] = {
                component: (componentType && componentType[0]) ?? '',
                binding: {
                    ...fieldProps
                }
            }
        })

    return fieldsData
}

export const fieldOptions = makeFieldsData()
