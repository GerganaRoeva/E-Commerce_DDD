class PlaceOrderCommand {
    constructor(orderId, customerId, orderItems, totalAmount) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
    }
}

export default PlaceOrderCommand;
