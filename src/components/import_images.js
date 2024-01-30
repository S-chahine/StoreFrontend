import basics from '../public/assets/images/categories/basics.jpg';
import outerwear from '../public/assets/images/categories/outerwear.jpg';
import tops from '../public/assets/images/categories/tops.jpg';
import dresses from '../public/assets/images/categories/dresses.jpg';
import skirts from '../public/assets/images/categories/skirts.jpg';
import pants from '../public/assets/images/categories/pants.jpg';

export const import_images = (imageURL) => {
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
