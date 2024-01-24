import React, { useEffect, useState } from 'react';
import './Confirmation.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../Cart/cartActions';

const Confirmation = () => {
  const location = useLocation();
  const { orderData } = location.state || {};
  const { orderNo } = location.state || {};
  const [firstName, setFirstName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(emptyCart());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!orderData) {
      // Handle the case when orderData is not available
      return;
    }

    const { user_id } = orderData;
    const fetchFirstName = async () => {
      try {
        const response = await axios.get(`https://storebackend-2c94.onrender.com/api/user/${user_id}`);
        const firstName = response.data.firstname;
        setFirstName(firstName);
      } catch (error) {
        console.error('Error fetching firstName:', error);
      }
    };
    fetchFirstName();
  }, [orderData]);

  if (!orderData) {
    // Handle the case when orderData is not available
    return <div className="confirm-div">No order data found.</div>;
  }

  const { user_id, order_total, status, shipping_address, payment_method, cartItems } = orderData;
  const order_number = orderNo;
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.subtotal), 0);
  const taxAmount = cartItems.reduce((total, item) => total + parseFloat(item.taxAmount), 0);
  const totalPayment = parseFloat(subtotal) + parseFloat(taxAmount);

  return (
    <div className="confirmation-container">
      <h1>Thanks {firstName}</h1>
      <h1>Order Confirmation</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <table className="confirm-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product_id}>
                <td>{item.title}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>
                  {typeof item.price_per_unit === 'string'
                    ? parseInt(item.price_per_unit).toFixed(2)
                    : 'N/A'}
                </td>
              </tr>
            ))}
            <tr className="subtotal-line">
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td colSpan="3"></td>
              <td>
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3"></td>
              <td>
                <strong>Tax Amount: </strong>${taxAmount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3"></td>
              <td>
                <strong>Total Payment:</strong> ${totalPayment.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="order-details">
        <h2>Order Details</h2>
        <p>
          <strong>Order Number:</strong> {order_number}
        </p>
        <p>
          <strong>Shipping Address:</strong> {shipping_address}
        </p>
        <p>
          <strong>Payment Method:</strong> {payment_method}
        </p>
        <p>
          <strong>Order Status:</strong> {status}
        </p>
        <p className="order-questions">
          For any questions or concerns, please contact our customer support at{' '}
          <a href="tel:1234567890">123-456-7890</a> or{' '}
          <a href="mailto:support@example.com">support@example.com</a>.
        </p>
      </div>
      <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>
          Thank you for your order. We appreciate your business and look forward to serving you
          again.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
