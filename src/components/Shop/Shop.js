import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import axios from 'axios';
import basics from '../../public/assets/images/categories/basics.webp';
import outerwear from '../../public/assets/images/categories/outerwear.webp';
import tops from '../../public/assets/images/categories/tops.webp';
import dresses from '../../public/assets/images/categories/dresses.webp';
import skirts from '../../public/assets/images/categories/skirts.webp';
import pants from '../../public/assets/images/categories/pants.webp';

const Shop = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://storebackend-2c94.onrender.com/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="shop-container">
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.category_id} className="category-item">
            <Link to={`/shop/products/${category.category_id}`} className="category-button">
              {category.name === 'Basics' && <img src={basics} alt={category.name} className="category-image" />}
              {category.name === 'Outerwear' && <img src={outerwear} alt={category.name} className="category-image" />}
              {category.name === 'Tops' && <img src={tops} alt={category.name} className="category-image" />}
              {category.name === 'Dresses' && <img src={dresses} alt={category.name} className="category-image" />}
              {category.name === 'Skirts' && <img src={skirts} alt={category.name} className="category-image" />}
              {category.name === 'Pants' && <img src={pants} alt={category.name} className="category-image" />}
              <h2 className="category-name">{category.name}</h2>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
