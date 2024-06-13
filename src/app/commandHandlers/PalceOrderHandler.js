import Order from '../../domain/aggregates/Order.js';
import OrderRepository from '../../infra/repositories/OrderRepository.js';
import OrderPlaced from '../../domain/events/OrderPlaced.js';
import EventStore from '../../infra/eventStore/EventStore.js';

class PlaceOrderHandler {
    async handle(command) {
        const { orderId, customerId, orderItems, totalAmount } = command;
        const order = new Order(orderId, customerId, orderItems, totalAmount);
        const orderPlacedEvent = new OrderPlaced(orderId, customerId, orderItems, totalAmount);
        
        const orderRepository = new OrderRepository();
        await orderRepository.save(order);

        const eventStore = new EventStore();
        await eventStore.saveEvent(orderPlacedEvent);

        return orderPlacedEvent;
    }
}

export default PlaceOrderHandler;
