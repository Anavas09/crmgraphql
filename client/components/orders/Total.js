import React, { useContext } from 'react';
import OrderContext from '../../context/orders/OrderContext';

function Total() {

  const orderContext = useContext(OrderContext);
  const { totalPrice } = orderContext;
  

  return (
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-400">
      <h2 className="text-gray-800 text-lg">Total: </h2>
      <p className="text-gray-800 mt-0">${totalPrice}</p>
    </div>
  );
}

export default Total