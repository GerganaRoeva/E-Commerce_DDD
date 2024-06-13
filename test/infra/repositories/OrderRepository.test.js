import { expect } from "chai";
import OrderRepository from "../../../src/infra/repositories/OrderRepository.js";
import Order from "../../../src/domain/aggregates/Order.js";

describe("OrderRepository", () => {
  it("should save and retrieve orders correctly", async () => {
    const repository = new OrderRepository();
    const order = new Order(
      "order1",
      "customer1",
      [{ id: "item1", name: "Item 1", quantity: 2 }],
      100
    );

    await repository.save(order);

    const retrievedOrder = await repository.get("order1");
    expect(retrievedOrder).to.deep.equal(order);
  });
});
