import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';
import loginIcon from '../../public/assets/images/icons/login-icon.jpg';
import logoutIcon from '../../public/assets/images/icons/logout-icon.jpg';
import cart from '../../public/assets/images/icons/cart.png';
import { useDispatch } from 'react-redux';
import { logout } from '../User/loginActions';
import { clearCart } from '../Cart/cartActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Navbar() {
  const [isIconHovered, setIsIconHovered] = useState(false); // Moved inside the component
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const cartItemCount = cartItems.length;
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://storebackend-etw3.onrender.com/api/products?search=${searchQuery}`);
      const searchData = response.data;
      setSearchResults(searchData);

      // Navigate to the Items page with search results
      navigate('/search', { state: { searchResults: searchData } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
  }

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="hover">
          <li>
            <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeclassname="active">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">About Us</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
            ) : (
              <NavLink exact="true" to="/login" activeclassname="active">Dashboard</NavLink>
            )}
          </li>
        </ul>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />

          </li>
          <li>
            {isLoggedIn ? (
              <NavLink to="/" onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  alt="Logout Icon"
                  className={isIconHovered ? 'hovered' : ''}
                  onMouseEnter={() => setIsIconHovered(true)}
                  onMouseLeave={() => setIsIconHovered(false)}
                />
                <span className="message">Logout</span>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <img
                  src={loginIcon}
                  alt="Login Icon"
                  className={isIconHovered ? 'hovered' : ''}
                  onMouseEnter={() => setIsIconHovered(true)}
                  onMouseLeave={() => setIsIconHovered(false)}
                />
                <span className="message">Login</span>
              </NavLink>
            )}

          </li>
          <li>
            <NavLink to="/cart">
              <div className="cart-icon">
                <img src={cart} alt="Shopping Cart" />
                {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
