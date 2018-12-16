import { Router } from 'express';
import { ensureAuth } from '../utils/socialAuth';
import Item from '../models/Item';
import { asyncMiddleware } from '../utils/utils';

const routes = Router();

// routes.get('/', (req, res) => {
//   Item.find({}).then();
//   res.json({ message: 'User routes backend' });
// });

routes.get(
  '/',
  asyncMiddleware(async (req, res, next) => {
    const items = await Item.find({});
    res.json(items);
  })
);

routes.post(
  '/new',
  asyncMiddleware(async (req, res, next) => {
    const { name, description, numStock, isInfQty, category, mainImg, imgs, price } = req.body;
    const { currency, amount } = price;

    const item = new Item({
      name,
      description,
      numStock,
      isInfQty,
      category,
      mainImg,
      imgs,
      price: {
        currency,
        amount
      }
    });
    const savedItem = await item.save();
    res.json(savedItem);
  })
);

export default routes;
