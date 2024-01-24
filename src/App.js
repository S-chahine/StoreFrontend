import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import CategoryCard from './components/Categories/CategoryCard';
import Home from './components/Home/Home';
import ShoppingCart from './components/Cart/cart';
import AboutUs from './components/About/AboutUs';
import Login from './components/User/Login';
import Shop from './components/Shop/Shop';
import Search from './components/Search/Search';
import CheckoutPage from './components/Checkout/CheckoutPage';
import Dashboard from './components/User/Dashboard';
import ItemDetails from './components/Item/ItemDetails';
import Orders from './components/Orders/Orders';
import Confirmation from './components/Confirmation/Confirmation';
import store from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="Header-Container">
            <Header />
          </div>
          <div className="Content-Container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/products/:categoryId" element={<CategoryCard />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/shop/product/:productId" element={<ItemDetails />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders/:userId" element={<Orders />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
