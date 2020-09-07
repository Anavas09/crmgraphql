import { SET_CLIENT, SET_PRODUCT, PRODUCT_QUANTITY } from '../../types';

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
        products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product),
      };

    default:
      return state;
  }
}

export default OrderReducer;