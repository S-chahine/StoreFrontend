import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './Orders.css';

const OrderItem = ({ order }) => {
  const {
    order_number,
    order_total,
    status,
    shipping_address,
    payment_method,
    subtotal,
    taxamount,
    created_at,
    order_items
  } = order;

  const formattedCreatedAt = moment(created_at).format('MMMM Do, YYYY [at] h:mm A');

  return (
    <div className="order-item">
      <h3><strong>Order Number: </strong>{order_number}</h3>
      <p><strong>Status: </strong>{status}</p>
      <p><strong>Shipping Address: </strong>{shipping_address}</p>
      <p><strong>Payment Method: </strong>{payment_method}</p>
      <p><strong>Subtotal: </strong>${subtotal}</p>
      <p><strong>Tax Amount: </strong>${taxamount}</p>
      <p><strong>Order Total: </strong>${order_total}</p>
      <p><strong>Created At: </strong>{formattedCreatedAt}</p>
      <hr />

      <h3>Order Items:</h3>
      {order_items && order_items.length > 0 ? (
        order_items.map((item) => (
          <div key={item.orderitem_id} className="item">
            <p><strong>Title: </strong>{item.item_title}</p>
            <p><strong>Size: </strong>{item.item_size}</p>
            <p><strong>Price: </strong>${item.price_per_unit}</p>
            <hr />
          </div>
        ))
      ) : (
        <p><strong>No order items found.</strong></p>
      )}
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://storebackend-2c94.onrender.com/api/orders/${userId}`);
        const ordersData = response.data;

        // Group order items by order ID
        const groupedOrders = {};
        ordersData.forEach((order) => {
          if (groupedOrders[order.order_id]) {
            groupedOrders[order.order_id].order_items.push(order);
          } else {
            groupedOrders[order.order_id] = {
              ...order,
              order_items: [order],
            };
          }
        });

        const groupedOrdersArray = Object.values(groupedOrders);
        setOrders(groupedOrdersArray);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2><strong>Customer Orders</strong></h2>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem key={order.order_id} order={order} />
        ))
      ) : (
        <p><strong>No orders found.</strong></p>
      )}
    </div>
  );
};

export default OrdersPage;
