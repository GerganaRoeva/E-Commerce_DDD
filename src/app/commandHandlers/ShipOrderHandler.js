import OrderRepository from "../../infra/repositories/OrderRepository.js";
import OrderShipped from "../../domain/events/OrderShipped.js";
import EventStore from "../../infra/eventStore/EventStore.js";

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

export default ShipOrderHandler;
