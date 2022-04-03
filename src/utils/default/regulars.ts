/* eslint-disable */
const regulars = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    password: /^.{8,}$/,
    numbers: /^\d+$/,
    names: /^[a-zA-Zа-яА-Я-]{2,}$/,
    phones: /^\+7\s\d{3}\s\d{3}-\d\d-\d\d$/,
    inn: /^(\d{10}|\d{12})$/,
    bik: /^\d{9}$/,
    ikz: /^\d{36}$/,
    iku: /^\d{36}$/,
    okpd2: /\d{2}\.\d{2}\.\d{2}\.\d{3}/,
    auctionNumber: /^(\d{11}|\d{19})$/,
    auctionNumber615: /^\d{18}$/,
    date: /\d{2}.\d{2}.\d{4}/,
    anyField: /.*/,
    notEmptyField: /.+/,
    url: /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/,
}

export const toNumberDecimal = (text: string | number) =>
    parseFloat(text.toString().replace(/\s/g, '').replace(',', '.'))
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',')

export default regulars
/* eslint-enable */
