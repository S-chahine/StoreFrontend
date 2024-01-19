import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './CheckoutPage.css';

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  // Retrieve the orderTotal from the first item in the cartItems array
  //const orderTotal = cartItems.length > 0 ? cartItems[0].total : 0;
  // Calculate the order total including tax for all items in the cart
  const orderTotal = cartItems.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);

  const user = useSelector((state) => state.login.user || {});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !address || !paymentMethod) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Prepare data to be posted
    const orderData = {
      user_id: user.user_id,
      order_total: orderTotal,
      status: 'Pending',
      shipping_address: address,
      payment_method: paymentMethod,
      cartItems: cartItems.map((item) => ({
        product_id: item.id,
        title: item.title,
        size_id: item.size_id,
        size: item.size,
        quantity: item.quantity,
        price_per_unit: item.price,
        subtotal: item.subtotal,
        taxAmount: item.taxAmount,
        total: item.total
      })),
    };
    console.log(orderData);

    // Function to get the available quantity for a product size
    const getAvailableQuantity = async (productSizeId) => {
      try {
        const response = await axios.get(`http://localhost:9000/api/product_size/${productSizeId}`);
        return response.data.availableQuantity;
      } catch (error) {
        console.error('Error fetching available quantity:', error);
        // Handle the error case
        return null;
      }
    };

    // Function to update the available quantity for a product size
    const updateAvailableQuantity = async (productSizeId, newQuantity) => {
      try {
        await axios.put(`http://localhost:9000/api/product_size/${productSizeId}`, {
          availableQuantity: newQuantity
        });
      } catch (error) {
        console.error('Error updating available quantity:', error);
        // Handle the error case
      }
    };
    const updateProductSizeAvailability = async () => {
      if (!orderData) {
        // Handle the case when orderData is not available
        return;
      }

      const { cartItems } = orderData;

      // Iterate over the cartItems array
      for (const item of cartItems) {
        const { size_id, quantity } = item;

        // Get the available quantity for the product size
        const availableQuantity = await getAvailableQuantity(size_id);

        if (availableQuantity !== null) {
          // Reduce the available quantity by the ordered quantity
          const updatedQuantity = parseInt(availableQuantity) - parseInt(quantity);


          // Update the available quantity with the new amount
          await updateAvailableQuantity(size_id, updatedQuantity);
        }
      }
    };

    try {
      // Send HTTP request to insert order details
      const response = await axios.post('http://localhost:9000/api/orders', orderData);

      // Handle API response
      const orderId = response.data.orderId;
      const orderNo = response.data.orderNumber;

      updateProductSizeAvailability(); // Call the function to update product size availability

      // Function to update product size availability
      navigate('/confirmation', { state: { orderData, orderNo } });
    } catch (error) {
      // Handle error
      console.error(error.response.data);
    }
  };

  return (
    <div className="checkout-container">
      <div className="h2">
        <h2>Checkout</h2>
      </div>
      <div className="checkout-page">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder={`${user.firstname} ${user.lastname}`}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label htmlFor="payment">Payment Method:</label>
          <select
            className="payment"
            id="payment"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          <button type="submit">Place Order</button>
        </form>

        <div className="checkout-summary">
          <p>Total Price: ${orderTotal}</p>
          <p>Cart Items:</p>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} - Size: {item.size}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
