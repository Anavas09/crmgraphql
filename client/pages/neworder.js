import React from 'react';

import Layout from '../components/Layout';
import SetClient from '../components/orders/SetClient';
import SetProducts from '../components/orders/SetProducts';

function NewOrder() {

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <SetClient />

      <SetProducts />
    </Layout>
  );
}

export default NewOrder;