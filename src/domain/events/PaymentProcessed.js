class PaymentProcessed {
    constructor(orderId, amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.eventName = 'PaymentProcessed';
    }
}

export default PaymentProcessed;
