export default class CreateOrderService {
    static key = Symbol()

    auctionFields: any = null

    constructor(fields: {auctionFields: any}) {
        this.auctionFields = fields.auctionFields ?? {}
    }
}