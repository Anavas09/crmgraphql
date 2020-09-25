import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import {
  PRODUCT_QUANTITY,
  SET_CLIENT,
  SET_PRODUCT,
  UPDATE_TOTAL
} from '../../types';

function OrderState({ children }) {
  //Order State
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  /**
   * Modify client (Client object in the state)
   * @param {JSON} client
   * Client object
   **/
  const addClient = client => {
    dispatch({
      type: SET_CLIENT,
      payload: client,
    });
  };

  /**
   * Modify products (The products array in the state)
   * @param {Array} productsSelected
   * Products array
   **/
  const addProduct = productsSelected => {
    let newState;

    if (state.products && state.products.length > 0) {
      //Take the products array before it will modified by react-selected
      //and make a copy. Then return a new object
      //with the same values than the deleted one.
      if (productsSelected){
        newState = productsSelected.map(product => {
          const newObject = state.products.find(
            productState => productState.id === product.id
          );
          return { ...product, ...newObject };
        });
      };
    } else {
      newState = productsSelected;
    }

    dispatch({
      type: SET_PRODUCT,
      payload: newState,
    });
  };

  /**
   * Modify the product object adding quantity property
   * @param {JSON} productWithQuantity
   * New product object with the quantity property
   **/
  const productQuantity = productWithQuantity => {
    dispatch({
      type: PRODUCT_QUANTITY,
      payload: productWithQuantity,
    });
  };

  /**
   * Update the total price to pay
   **/
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL
    })
  }

  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        addClient,
        addProduct,
        productQuantity,
        updateTotal,
        totalPrice: state.total,
        client: state.client
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderState;