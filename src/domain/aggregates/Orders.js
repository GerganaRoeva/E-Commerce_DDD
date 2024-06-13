class Order {
    constructor(orderId, customerId, orderItems, totalAmount, status = 'Pending') {
        this.orderId = orderId;
        this.customerId = customerId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    addOrderItem(productId, quantity, price) {
        const orderItem = { productId, quantity, price };
        this.orderItems.push(orderItem);
        this.totalAmount += quantity * price;
    }

    processPayment(amount) {
        if (amount < this.totalAmount) {
            throw new Error('Insufficient payment amount');
        }
        this.status = 'Paid';
    }

    shipOrder() {
        if (this.status !== 'Paid') {
            throw new Error('Order cannot be shipped unless it is paid');
        }
        this.status = 'Shipped';
    }
}

module.exports = Order;
