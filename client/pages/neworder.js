import React from 'react';

import Layout from '../components/Layout';
import SetClient from '../components/orders/SetClient';
import SetProducts from '../components/orders/SetProducts';
import OrderResume from '../components/orders/OrderResume';
import Total from '../components/orders/Total';

function NewOrder() {

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
            className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900`}
          >
            Add Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default NewOrder;