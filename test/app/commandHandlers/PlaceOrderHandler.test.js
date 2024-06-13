import { expect } from "chai";
import PlaceOrderHandler from "../../../src/app/commandHandlers/PalceOrderHandler.js";
import OrderPlaced from "../../../src/domain/events/OrderPlaced.js";

describe("PlaceOrderHandler", () => {
  it("should place an order correctly", async () => {
    const handler = new PlaceOrderHandler();
    const command = {
      orderId: "order1",
      customerId: "customer1",
      orderItems: [{ id: "item1", name: "Item 1", quantity: 2 }],
      totalAmount: 100,
    };

    const event = await handler.handle(command);

    expect(event).to.be.an.instanceOf(OrderPlaced);
    expect(event.orderId).to.equal(command.orderId);
  });
});
