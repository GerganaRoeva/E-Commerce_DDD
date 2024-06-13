class ProcessPaymentCommand {
    constructor(orderId, amount) {
        this.orderId = orderId;
        this.amount = amount;
    }
}

export default ProcessPaymentCommand;
