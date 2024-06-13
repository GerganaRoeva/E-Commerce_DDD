class OrderRepository {
    constructor() {
        this.orders = new Map();
    }

    async save(order) {
        this.orders.set(order.orderId, order);
    }

    async get(orderId) {
        return this.orders.get(orderId);
    }

    async getAll() {
        return Array.from(this.orders.values());
    }
}

module.exports = OrderRepository;
