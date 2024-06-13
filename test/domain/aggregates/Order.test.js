import { expect } from "chai";
import Order from "../../../src/domain/aggregates/Order.js";
describe("Order", () => {
  it("should process payment correctly", () => {
    const order = new Order(
      "order1",
      "customer1",
      [{ id: "item1", name: "Item 1", quantity: 2 }],
      100
    );

    order.processPayment(100);
    expect(order.status).to.equal("Paid");
  });

  it("should throw error for insufficient payment amount", () => {
    const order = new Order(
      "order1",
      "customer1",
      [{ id: "item1", name: "Item 1", quantity: 2 }],
      100
    );

    expect(() => order.processPayment(50)).to.throw(
      "Insufficient payment amount"
    );
  });
});
