const OrderRepository = require('../../infrastructure/repositories/OrderRepository');
const OrderShipped = require('../../domain/events/OrderShipped');
const EventStore = require('../../infrastructure/eventStore/EventStore');

class ShipOrderHandler {
    async handle(command) {
        const { orderId, address } = command;
        
        const orderRepository = new OrderRepository();
        const order = await orderRepository.get(orderId);

        order.shipOrder();

        const orderShippedEvent = new OrderShipped(orderId, address);
        await orderRepository.save(order);

        const eventStore = new EventStore();
        await eventStore.saveEvent(orderShippedEvent);

        return orderShippedEvent;
    }
}

module.exports = ShipOrderHandler;
