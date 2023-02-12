import { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { createApp } from '../src/app';
import { MockSequelize } from '../src/sequelize';

describe('SaleOrderController', () => {
  let app: Express;
  let saleOrderId: string;
  let saleOrderItemId: string;
  let mockSequelize: Sequelize;
  beforeAll(async () => {
    app = createApp();
    mockSequelize = MockSequelize();
    mockSequelize.sync();
  });

  describe('POST /sale-order/', () => {
    it('should create a new sale order', async () => {
      const payload = { customerName: 'Jane Doe' };
      const response = await request(app).post('/sale-order').send(payload);
      expect(response.status).toBe(201);
      expect(response.body.customerName).toEqual('Jane Doe');
      saleOrderId = response.body.id;
    });

    it('should return a 400 status code if the request body is invalid', async () => {
      const payload = {};
      const response = await request(app).post('/sale-order').send(payload);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: '"customerName" is required' });
    });
  });

  describe('GET /sale-order/:id', () => {
    it('should return a sale order by id', async () => {
      const response = await request(app).get(`/sale-order/${saleOrderId}`);
      expect(response.status).toBe(200);
      expect(response.body.customerName).toEqual('Jane Doe');
    });

    it('should return a 404 status code if the sale order is not found', async () => {
      const response = await request(app).get('/sale-order/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Sale order  not found' });
    });
  });

  describe('PUT/sale-order', () => {
    it('should update a sale order', async () => {
      const res = await request(app).put(`/sale-order/${saleOrderId}`).send({
        customerName: 'Updated John Doe',
      });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('customerName', 'Updated John Doe');
    });

    it('should return 400 Bad Request if data is invalid', async () => {
      const res = await request(app).put(`/sale-order/${saleOrderId}`).send({
        customerName: '',
      });

      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 404 Not Found if sale order is not found', async () => {
      const res = await request(app).put('/sale-order/unknown-id').send({
        customerName: 'Updated John Doe',
      });

      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Sale order  not found');
    });
  });

  describe('POST /sale-order-items', () => {
    it('should return 400 if request is invalid', async () => {
      const response = await request(app).post('/sale-order-items').send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: '"name" is required' });
    });

    it('should return 500 if there is an internal server error', async () => {
      const response = await request(app)
        .post('/sale-order-items')
        .send({ name: 'item 1', price: '10', quantity: 2, saleOrderId: '123' });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal Server Error' });
    });

    it('should return the created sale order item', async () => {
      const saleOrderItem = { name: 'item 1', price: 10, quantity: 2, saleOrderId };
      const response = await request(app)
        .post('/sale-order-items')
        .send({ name: 'item 1', price: 10, quantity: 2, saleOrderId });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ ...response.body, ...saleOrderItem });
      saleOrderItemId = response.body.id;
    });
  });

  describe('PUT /sale-order-items', () => {
    it('should update a sale order item', async () => {
      const updatedSaleOrderItem = { name: 'item2', price: 20, quantity: 4, saleOrderId };
      const { body } = await request(app)
        .put(`/sale-order-items/${saleOrderItemId}`)
        .send(updatedSaleOrderItem)
        .expect(200);
      expect(body).toEqual({ ...body, ...updatedSaleOrderItem });
    });

    it('should return 404 if sale order item not found', async () => {
      const updatedSaleOrderItem = { name: 'item2', price: 20, quantity: 4, saleOrderId: '123' };

      const { body } = await request(app)
        .put(`/sale-order-items/unknown-id`)
        .send(updatedSaleOrderItem)
        .expect(404);

      expect(body).toEqual({ message: 'Sale order item not found' });
    });

    it('should return 400 if request is invalid', async () => {
      const updatedSaleOrderItem = { name: 'item2', price: -20, quantity: 4, saleOrderId };

      const { body } = await request(app)
        .put(`/sale-order-items/${saleOrderItemId}`)
        .send(updatedSaleOrderItem)
        .expect(400);

      expect(body).toEqual({ message: '"price" must be greater than or equal to 0' });
    });

    it('should return 404 if Sale order item not found', async () => {
      const updatedSaleOrderItem = { name: 'item2', price: 20, quantity: 4, saleOrderId: '123' };

      const { body } = await request(app)
        .put(`/sale-order-items/${saleOrderItemId}`)
        .send(updatedSaleOrderItem)
        .expect(404);
      expect(body).toEqual({ message: 'Sale order item not found' });
    });
  });

  describe('DELETE /sale-order-items/:id', () => {
    it('should delete a sale order item', async () => {
      const response = await request(app)
        .delete(`/sale-order-items/${saleOrderItemId}`)
        .expect(200);

      expect(response.body).toEqual({ message: 'Sale order item deleted' });
    });

    it('should return 404 if sale order item does not exist', async () => {
      const response = await request(app).delete('/sale-order-items/some-id').expect(404);

      expect(response.body).toEqual({ message: 'Sale order item not found' });
    });
  });

  describe('DELETE /sale-order/:id', () => {
    it('should delete a sale order and return a message', async () => {
      const response = await request(app).delete(`/sale-order/${saleOrderId}`).expect(200);

      expect(response.body.message).toBe('Sale order  deleted');
    });

    it('should return a 404 if the sale order does not exist', async () => {
      const response = await request(app).delete('/sale-order/100').expect(404);
      expect(response.body.message).toBe('Sale order  not found');
    });
  });

  // Close the app and synchronize the database
  afterAll(async () => {
    // Drop all tables
    await mockSequelize
      .sync({ force: true })
      .then(() => {
        console.log('Tables dropped');
        mockSequelize.close();
      })
      // Log any error that occurs while dropping the tables
      .catch((error) => {
        console.error('Error while dropping tables: ', error);
        mockSequelize.close();
      });
  });
});
