import {
  PRODUCT_QUANTITY,
  SET_CLIENT,
  SET_PRODUCT,
  UPDATE_TOTAL,
} from '../../types';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce((newTotal, product) => newTotal += product.price * product.quantity, 0)
      };

    default:
      return state;
  }
}

export default OrderReducer;