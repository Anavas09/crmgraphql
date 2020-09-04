import React from 'react';

import Layout from '../components/Layout';
import SetClient from '../components/orders/SetClient';

function NewOrder() {

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <SetClient />
    </Layout>
  );
}

export default NewOrder;