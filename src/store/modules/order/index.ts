import {Module} from "vuex";

type Payload = { fieldName: string, value: any }

const orderModule: Module<any, any> = {
    namespaced: true,
    state: () => ({
        auction: {
            number: '',
            financeProductId: null,
            date: ['', ''],
            sum: '',
            proposedPrice: '',
        }
    }),
    actions: {
        setAuction({ commit }, payload: Payload) {
            commit('setAuction', payload)
        }
    },
    mutations: {
        setAuction(state, payload: Payload) {
            state.auction[payload.fieldName] = payload.value
        }
    },
    getters: {
        getAuction(state) {
            return state.auction
        },
    },
}

export default orderModule