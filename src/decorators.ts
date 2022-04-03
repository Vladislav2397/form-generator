/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'
import { createDecorator } from 'vue-class-component'
import Vue from "vue";

export const Getter = createDecoratorFactory('computed', mapGetters)
export const Action = createDecoratorFactory('methods', mapActions)

function createDecoratorFactory(
    optionsKey: 'computed' | 'methods',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapFn: any,
) {
    return (storeKey: string) => createDecorator((options, key) => {
        const mapObject = { [key]: storeKey }

        if (typeof options[optionsKey] === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            options[optionsKey] = {}
        }

        if (typeof options[optionsKey]![key] !== 'undefined') {
            return
        }

        // eslint-disable-next-line no-param-reassign
        options[optionsKey]![key] = mapFn(mapObject)[key]
    })
}

function toCapitalize(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function VuexFieldMap(moduleName: string) {
    return createDecorator((options, key) => {
        const getterKey = `get${toCapitalize(moduleName)}`
        const actionKey = `set${toCapitalize(moduleName)}`

        console.log(mapActions({ 'order': `order/${actionKey}` })['order'])

        if (typeof options['computed'] === 'undefined') {
            options['computed'] = {}
        }

        if (typeof options['computed']![key] !== 'undefined') {
            return
        }

        // if (typeof options['methods'] === 'undefined') {
        //     options['methods'] = {}
        // }

        // if (typeof options['methods']![key] !== 'undefined') {
        //     return
        // }

        // const getter = `${key}Getter`
        // options['computed'][getter] = mapGetters({ 'order': `order/${getterKey}` })['order']
        //
        // const action = `${key}Action`
        // options['methods'][action] = mapActions({ 'order': `order/${actionKey}` })['order']

        Vue.nextTick(() => {
            options['computed']['auction'] = {
                get() {
                    return options?.store?.getters['order/getAuction']
                },
                set(value) {
                    options.store?.dispatch('order/setAuction', value)
                }
            }
        })
    })
}