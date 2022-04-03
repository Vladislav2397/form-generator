import { Store } from 'vuex'
import { StateUser } from '../../store/modules/user/state'
import { StateOrders } from '../../store/modules/orders/state'
import { StateModals } from '../../store/modules/modals/state'
import { StateBanks } from '../../store/modules/banks/state'
import { StateOrderCreate } from '../../store/modules/order-create/state'
import { StateProducts } from '../../store/modules/products/state'
import { StateOrderClient } from '../../store/modules/order-client/state'
import { StateNavigation } from '../../store/modules/navigation/state'

export type ActionType<F> = F extends (state: infer S, payload: infer P) => infer R ? (payload?: P) => Promise<R> : never
export type MutationType<F> = F extends (state: infer S, payload: infer P) => infer R ? (payload: P) => R : never

export type StateRoot = {
    user: StateUser
    navigation: StateNavigation
    orders: StateOrders
    modals: StateModals
    banks: StateBanks
    orderCreate: StateOrderCreate
    products: StateProducts
    orderClient: StateOrderClient
}

export interface AsyncData {
    store: Store<StateRoot>
}
