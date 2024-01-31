import basics from '../public/assets/images/categories/basics.webp';
import outerwear from '../public/assets/images/categories/outerwear.webp';
import tops from '../public/assets/images/categories/tops.webp';
import dresses from '../public/assets/images/categories/dresses.webp';
import skirts from '../public/assets/images/categories/skirts.webp';
import pants from '../public/assets/images/categories/pants.webp';

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
