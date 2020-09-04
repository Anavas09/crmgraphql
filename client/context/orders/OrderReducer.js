import { SET_CLIENT, SET_PRODUCT, PRODUCT_QUANTITY } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SET_CLIENT:
      return {
        ...state,
        client: action.payload
      }
  
    default:
      return state;
  }
}