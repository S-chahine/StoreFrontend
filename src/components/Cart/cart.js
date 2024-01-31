import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem, updateQuantity, checkout } from './cartActions';
import { import_images } from '../import_images';
import './cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateItem = async (itemId, newSize) => {
    const response = await axios.get(`https://storebackend-etw3.onrender.com/api/size_id/${itemId}/${newSize}`);
    const newSizeId = response.data.product_size_id;
    dispatch(updateCartItem(itemId, newSizeId, newSize));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity(itemId, newQuantity));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const isSizeSelected = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item && item.size !== '';
  };

  const handleCheckout = () => {
    const allSizesSelected = cartItems.every((item) => item.size !== '');
    if (allSizesSelected) {
      dispatch(checkout());
      toast.success('Checkout process initiated.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      const subtotal = calculateSubtotal();
      const taxRate = 0.13;
      const taxAmount = (subtotal * taxRate).toFixed(2);
      const orderTotal = (parseFloat(subtotal) + parseFloat(taxAmount)).toFixed(2);

      const cartItemsWithTotal = cartItems.map((item) => ({
        ...item,
        subtotal: (item.price * item.quantity).toFixed(2),
        taxAmount: (item.price * item.quantity * taxRate).toFixed(2),
        total: ((item.price * item.quantity) + (item.price * item.quantity * taxRate)).toFixed(2),
      }));

      navigate('/checkout', { state: { orderTotal, cartItems: cartItemsWithTotal } });
    } else {
      toast.error('Please select a size for all items before proceeding to checkout.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="cart-h2">
        <h2>Shopping Cart</h2>
      </div>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={import_images(item.image)} alt="item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">Price: ${item.price}</p>
                  <p className="cart-item-quantity">
                    Quantity:
                    <input
                      className="quantity"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </p>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <div className="size-change">
                    <label>Change size?</label>
                    <select
                      value={item.size}
                      onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                    >
                      <option value=""></option>
                      {item.availableSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="total-tax">
              <p className="cart-subtotal">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
              <p className="cart-tax">Tax (13%): ${(calculateSubtotal() * 0.13).toFixed(2)}</p>
              <p className="cart-total">
                Total: ${(parseFloat(calculateSubtotal()) + parseFloat((calculateSubtotal() * 0.13).toFixed(2))).toFixed(2)}
              </p>
            </div>
            {cartItems.some((item) => !isSizeSelected(item.id)) && (
              <p className="size-not-selected-message">
                Please select a size for all items before proceeding to checkout.
              </p>
            )}
            <div className="proceed-to-checkout">
              <button
                className="proceed-to-checkout-button"
                onClick={handleCheckout}
                disabled={cartItems.some((item) => !isSizeSelected(item.id))}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
