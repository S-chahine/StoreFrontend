// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CHECKOUT = 'CHECKOUT';
export const EMPTY_CART = 'EMPTY_CART';

// Action Creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: {
    item: {
      ...item,
      availableSizes: item.availableSizes,
    },
  },
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const updateCartItem = (itemId, newSizeId, newSize) => ({
  type: UPDATE_CART_ITEM,
  payload: { itemId, newSizeId, newSize },
});

export const updateQuantity = (itemId, newQuantity) => ({
  type: UPDATE_QUANTITY,
  payload: { itemId, newQuantity },
});
export const checkout = () => ({
  type: CHECKOUT,
});
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
