class OrderPlaced {
    constructor(orderId, customerId, orderItems, totalAmount) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.eventName = 'OrderPlaced';
    }
}

export default OrderPlaced;
