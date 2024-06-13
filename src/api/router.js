import { Router } from "express";
import QueryHandler from "../app/queries/QueryHandler.js";
import GetOrderQuery from "../app/queries/GetOrderQuery.js";
import ListOrdersQuery from "../app/queries/ListOrdersQuery.js";
import PlaceOrderHandler from "../app/commandHandlers/PalceOrderHandler.js";
import ProcessPaymentHandler from "../app/commandHandlers/ProcessPaymentHandler.js";
import ShipOrderHandler from "../app/commandHandlers/ShipOrderHandler.js";
import PlaceOrderCommand from "../app/commands/PlaceOrderCommand.js";
import ProcessPaymentCommand from "../app/commands/ProcessPaymentCommand.js";
import ShipOrderCommand from "../app/commands/ShipOrderCommand.js";

const router = Router();
const queryHandler = new QueryHandler();

router.get("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const query = new GetOrderQuery(orderId);
  queryHandler
    .handleGetOrder(query)
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(404).json({ error: err.message }));
});

router.get("/orders", (req, res) => {
  const query = new ListOrdersQuery();
  queryHandler
    .handleListOrders(query)
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.post("/orders", async (req, res) => {
  const { orderId, customerId, orderItems, totalAmount } = req.body;
  const command = new PlaceOrderCommand(
    orderId,
    customerId,
    orderItems,
    totalAmount
  );
  const handler = new PlaceOrderHandler();
  try {
    const event = await handler.handle(command);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/orders/:orderId/pay", async (req, res) => {
  const { orderId } = req.params;
  const { amount } = req.body;
  const command = new ProcessPaymentCommand(orderId, amount);
  const handler = new ProcessPaymentHandler();
  try {
    const event = await handler.handle(command);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/orders/:orderId/ship", async (req, res) => {
  const { orderId } = req.params;
  const { address } = req.body;
  const command = new ShipOrderCommand(orderId, address);
  const handler = new ShipOrderHandler();
  try {
    const event = await handler.handle(command);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
