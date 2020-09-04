import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import { SET_CLIENT, SET_PRODUCT, PRODUCT_QUANTITY } from '../../types';

function OrderState({children}) {

  //Order State
  const initialState = {
    client: {},
    products: [],
    total: 0
  }

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  //Modify client
  const addClient = client => {
    console.log(client);
    dispatch({
      type: SET_CLIENT,
      payload: client
    })
  }

  return (
    <OrderContext.Provider value={{
      addClient
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState;