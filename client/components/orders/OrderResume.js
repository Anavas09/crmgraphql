import React, { useContext } from 'react';

//Order Context
import OrderContext from '../../context/orders/OrderContext';
import ProductResume from './ProductResume';

function OrderResume() {

  //Order Context. Use context and get functions and values
  const orderContext = useContext(OrderContext);
  const { products } = orderContext;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-green-800 text-green-700 p-2 text-sm font-bold">
        3.- Products Quantity
      </p>
      {products && products.length > 0 ? (
        products.map(product => {
          return <ProductResume key={product.id} product={product} />;
        })
      ) : (
        <p className="mt-2 text-sm">There is not products yet</p>
      )}
    </>
  );
}

export default OrderResume;