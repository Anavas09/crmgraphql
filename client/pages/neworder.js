import React, { useContext } from 'react';

import Layout from '../components/Layout';
import SetClient from '../components/orders/SetClient';
import SetProducts from '../components/orders/SetProducts';
import OrderResume from '../components/orders/OrderResume';
import Total from '../components/orders/Total';
import OrderContext from '../context/orders/OrderContext';

function NewOrder() {
  const orderContext = useContext(OrderContext);
  const { client, products, total } = orderContext;

  const validateOrder = () => {
    return !products.every(product => product.quantity > 0) ||
      products.length === 0 ||
      total === 0 ||
      !client.name
      ? ' opacity-50 cursor-not-allowed '
      : '';
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <SetClient />
          <SetProducts />
          <OrderResume />
          <Total />

          <button
            type="button"
            className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900 ${
              products && products.length > 0 && validateOrder()
            }`}
          >
            Add Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default NewOrder;