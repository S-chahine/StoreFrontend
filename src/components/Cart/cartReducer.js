// cartReducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_ITEM,
  UPDATE_QUANTITY,
  EMPTY_CART,
} from './cartActions';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.item],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };
    case UPDATE_CART_ITEM:
      const { itemId, newSizeId, newSize } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === itemId ? { ...item, size_id: newSizeId, size: newSize } : item
        ),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId ? { ...item, quantity: action.payload.newQuantity } : item
        ),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
