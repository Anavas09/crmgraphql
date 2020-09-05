import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import { SET_CLIENT, SET_PRODUCT, PRODUCT_QUANTITY } from '../../types';

function OrderState({ children }) {
  //Order State
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  /**Modify client (Client object in the state)*/
  const addClient = client => {
    console.log(client);
    dispatch({
      type: SET_CLIENT,
      payload: client,
    });
  };

  /**Modify products (The products array in the state)*/
  const addProduct = products => {
    console.log(products);
    dispatch({
      type: SET_PRODUCT,
      payload: products,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        addClient,
        addProduct
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderState;