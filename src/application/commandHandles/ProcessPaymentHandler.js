const OrderRepository = require('../../infrastructure/repositories/OrderRepository');
const PaymentProcessed = require('../../domain/events/PaymentProcessed').default;
const EventStore = require('../../infrastructure/eventStore/EventStore');

class ProcessPaymentHandler {
    async handle(command) {
        const { orderId, amount } = command;
        
        const orderRepository = new OrderRepository();
        const order = await orderRepository.get(orderId);
        
        order.processPayment(amount);

        const paymentProcessedEvent = new PaymentProcessed(orderId, amount);
        await orderRepository.save(order);

        const eventStore = new EventStore();
        await eventStore.saveEvent(paymentProcessedEvent);

        return paymentProcessedEvent;
    }
}

module.exports = ProcessPaymentHandler;
