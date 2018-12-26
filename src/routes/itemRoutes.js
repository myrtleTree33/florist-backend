import { Router } from 'express';
import Item from '../models/Item';
import { asyncMiddleware } from '../utils/utils';

const routes = Router();

const getRange = (defaultVal, min, max, i) => {
  if (!i) {
    return defaultVal;
  }
  let resolvedNum = Math.round(i);
  resolvedNum = Math.floor(resolvedNum, 20);
  resolvedNum = Math.ceil(resolvedNum, 0);
  return resolvedNum;
};

routes.get(
  '/',
  asyncMiddleware(async (req, res, next) => {
    const { num = 20, filter: category } = req.query;
    const i = getRange(20, 1, 20, num);
    let items;
    if (!category) {
      items = await Item.find({}).limit(i);
    } else {
      items = await Item.find({ category }).limit(i);
    }
    return res.json(items);
  })
);

routes.get(
  '/:id',
  asyncMiddleware(async (req, res, next) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    res.json(item);
  })
);

// routes.post(
//   '/new',
//   asyncMiddleware(async (req, res, next) => {
//     const { name, description, numStock, isInfQty, category, mainImg, imgs, price } = req.body;
//     const { currency, amount } = price;

//     const item = new Item({
//       name,
//       description,
//       numStock,
//       isInfQty,
//       category,
//       mainImg,
//       imgs,
//       price: {
//         currency,
//         amount
//       }
//     });
//     const savedItem = await item.save();
//     res.json(savedItem);
//   })
// );

export default routes;
