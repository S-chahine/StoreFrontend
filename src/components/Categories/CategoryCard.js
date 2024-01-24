import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryCard.css';
import basics from '../../public/assets/images/categories/basics.jpg';
import outerwear from '../../public/assets/images/categories/outerwear.jpg';
import tops from '../../public/assets/images/categories/tops.jpg';
import dresses from '../../public/assets/images/categories/dresses.jpg';
import skirts from '../../public/assets/images/categories/skirts.jpg';
import pants from '../../public/assets/images/categories/pants.jpg';


const CategoryCard = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItemsByCategory(categoryId);
  }, [categoryId]);

  const fetchItemsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`https://storebackend-etw3.onrender.com/api/products/${categoryId}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const getCategoryImageUrl = (imageURL) => {
    switch (imageURL) {
      case 'basics':
        return basics;
      case 'outerwear':
        return outerwear;
      case 'tops':
        return tops;
      case 'dresses':
        return dresses;
      case 'skirts':
        return skirts;
      case 'pants':
        return pants;
      default:
        return '';
    }
  };

  return (
    <div>
      <h2>Category Items</h2>
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.product_id} className="item-item">
            <Link to={`/shop/product/${item.product_id}`} className="item-link">
              <div className="item-button">
                <img src={getCategoryImageUrl(item.image_url)} alt={item.title} className="item-image" />
                <div className="item-info">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">${item.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
