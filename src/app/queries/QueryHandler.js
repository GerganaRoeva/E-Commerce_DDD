const OrderRepository = require('../../infrastructure/repositories/OrderRepository');

class QueryHandler {
    async handleGetOrder(query) {
        const orderRepository = new OrderRepository();
        return await orderRepository.get(query.orderId);
    }

    async handleListOrders(query) {
        const orderRepository = new OrderRepository();
        return await orderRepository.getAll();
    }
}

module.exports = QueryHandler;
