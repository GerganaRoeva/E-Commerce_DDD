import { Router } from 'express';
import QueryHandler from '../app/queries/QueryHandler.js';
import GetOrderQuery from '../app/queries/GetOrderQuery.js';
// import ListOrdersQuery from '../app/queries/ListOrdersQuery';

const router = Router();
const queryHandler = new QueryHandler();

router.get('/orders/:orderId', (req, res) => {
    const { orderId } = req.params;
    const query = new GetOrderQuery(orderId);
    queryHandler.handleGetOrder(query)
        .then(order => res.status(200).json(order))
        .catch(err => res.status(404).json({ error: err.message }));
});

router.get('/orders', (req, res) => {
    const query = new ListOrdersQuery();
    queryHandler.handleListOrders(query)
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({ error: err.message }));
});

export default router;
