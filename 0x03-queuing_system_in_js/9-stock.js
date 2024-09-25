#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const listProducts = [
  {
    id: 1,
    name: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  {
    id: 2,
    name: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    id: 3,
    name: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    id: 4,
    name: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5
  },
];

// return the item
const getItemById = (id) => {
  const item = listProducts.find(product => product.id === id);

  if (item) {
    return item;
  }
};

// create express server & routes
const app = express();
// app.use(json());

// create Client
const client = createClient();

// redis
const reserveStockById = async (itemId, stock) => {
    return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
  };
  
const getCurrentReservedStockById = async (itemId) => {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
};

// routes
app.get('/list_products', (_, res) => {
  res.json(listProducts);
});
  
app.get('/list_products/:itemId', (req, res) => {
  const productItem = getItemById(req.params.itemId);
  
  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(req.params.itemId)
    .then((res) => (res || 0))
    .then((reservedStock) => {
      productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;
      res.json(productItem);
    });
  });
  
app.get('/reserve_product/:itemId', (req, res) => {
  const productItem = getItemById(req.params.itemId);
  
  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(req.params.itemId)
    .then((result) => (result || 0))
    .then((reservedStock) => {
    if (reservedStock >= productItem.initialAvailableQuantity) {
        res.json({ status: 'Not enough stock available', itemId: req.params.itemId });
        return;
    }
    reserveStockById(itemId, reservedStock + 1)
      .then(() => {
       res.json({ status: 'Reservation confirmed', itemId: req.params.itemId });
       });
    });
  });
  
  const resetProductsStock = () => {
    return Promise.all(
      listProducts.map(
        item => promisify(client.SET).bind(client)(`item.${item.itemId}`, 0),
      )
    );
  };

// listen on port = 1245
app.listen(1245, () => {
    resetProductsStock()
      .then(() => {
        console.log('Server running on port 1245');
      });
  });
  
  export default app;
