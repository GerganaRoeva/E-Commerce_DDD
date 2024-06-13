import OrderRepository from "../../infra/repositories/OrderRepository.js";
import PaymentProcessed from "../../domain/events/PaymentProcessed.js";
import EventStore from "../../infra/eventStore/EventStore.js";

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

export default ProcessPaymentHandler;
