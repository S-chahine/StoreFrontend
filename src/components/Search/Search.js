import { useLocation } from 'react-router-dom';
import { import_images } from '../import_images';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <div>
      <h2>Search Results:</h2>
      <div className="item-grid">
        {searchResults.map((product) => (
          <div key={product.product_id} className="item-item">
            <Link to={`/shop/product/${product.product_id}`} className="item-link">
              <div className="item-button">
                <img src={import_images(product.image_url)} alt={product.title} className="item-image" />
                <div className="item-info">
                  <h3 className="item-title">{product.title}</h3>
                  <p className="item-price">${product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
