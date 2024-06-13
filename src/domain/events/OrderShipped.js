class OrderShipped {
    constructor(orderId, address) {
        this.orderId = orderId;
        this.address = address;
        this.eventName = 'OrderShipped';
    }
}

module.exports = OrderShipped;

