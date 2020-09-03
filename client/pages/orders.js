import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

function Orders() {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link href="/neworder">
        <a className="bg-green-800 py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
          New Order
        </a>
      </Link>
    </Layout>
  );
}

export default Orders;