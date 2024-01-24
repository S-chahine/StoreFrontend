import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ItemDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Cart/cartActions';
import { import_images } from '../import_images';

const ItemDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [productData, setProductData] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [message, setMessage] = useState('');
  const cartItems = useSelector((state) => state.cart.cartItems);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://storebackend-2c94.onrender.com/api/shop/product/${productId}`);
        const productData = response.data;
        setProductData(productData);
      } catch (error) {
        console.error('Error retrieving product details:', error);
      }
    };

    fetchProductData();
  }, [productId]);


  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
  };

  useEffect(() => {
    let timeoutId;

    if (isAddedToCart) {
      timeoutId = setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000); // Reset isAddedToCart to false after 2000 milliseconds (adjust as needed)
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAddedToCart]);


  const handleAddToCart = async () => {
    // Check if size is selected
    if (selectedSize === '') {
      setMessage('Please select a size.');
      return;
    }

    // Check if quantity is valid
    if (quantity <= 0 || isNaN(quantity)) {
      setMessage('Please enter a valid quantity.');
      return;
    }

    // Check if product data is available
    if (!productData) {
      setMessage('Product data is not available.');
      return;
    }

    // Check if selected size is available
    const selectedSizeData = productData.sizes.find((size) => size.size === selectedSize);
    if (!selectedSizeData || selectedSizeData.quantity_available < quantity) {
      setMessage('The requested quantity is not available for the selected size.');
      return;
    }

    const response = await axios.get(`https://storebackend-2c94.onrender.com/api/size_id/${productId}/${selectedSize}`);
    const sizeId = response.data.product_size_id;
    //console.log(sizeId);

    // Dispatch addToCart action to add the item to the cart
    dispatch(
      addToCart({
        id: productData.product_id,
        title: productData.title,
        price: productData.price,
        quantity,
        size_id: sizeId,
        size: selectedSize,
        image: productData.image_url,
        availableSizes: productData.sizes.map((size) => size.size),
      })
    );

    setIsAddedToCart(true); // Set isAddedToCart to true
    console.log({ isAddedToCart });
    setMessage(''); // Clear the error message
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-details-container">
      <div className="item-image-container">
        <img src={import_images(productData.image_url)} alt={productData.title} className="item-image" />
      </div>
      <div className="item-details">
        <h2>{productData.title}</h2>
        <p>{productData.description}</p>
        <p>
          <strong>Price: </strong>${productData.price}
        </p>
        <div className="size-selection">
          <label htmlFor="size">Size:</label>
          <select id="size" value={selectedSize} onChange={handleSizeChange}>
            <option value="">Select Size</option>
            {productData.sizes.map((size) => (
              <option key={size.product_size_id} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
        </div>
        <div className="quantity-selection">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div className="cart-button">
          <button onClick={handleAddToCart}>Add to Cart</button>
          {isAddedToCart && <p className="message-item success">Item added to cart successfully!</p>} {/* Show success message */}
          {message && <p className="message-item error">{message}</p>} {/* Show error message */}

        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
