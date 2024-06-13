const Order = require('../../domain/aggregates/Orders.js');
const OrderRepository = require('../../infra/repositories/OrderRepository.js');
const OrderPlaced = require('../../domain/events/OrderPlaced.js');
const EventStore = require('../../infra/eventStore/EventStore.js');

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

module.exports = PlaceOrderHandler;
