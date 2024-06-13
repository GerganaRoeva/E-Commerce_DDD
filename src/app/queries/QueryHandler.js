import OrderRepository from '../../infra/repositories/OrderRepository.js';

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

export default QueryHandler;
