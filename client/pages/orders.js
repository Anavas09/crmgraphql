import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import Layout from '../components/Layout';

import { GET_ORDERS_BY_SELLER } from '../graphql/queries';
import Order from '../components/Order';

function Orders() {

  const { data, loading, error } = useQuery(GET_ORDERS_BY_SELLER);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  console.log(data);

  const { getOrdersBySeller } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link href="/neworder">
        <a className="bg-green-800 py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
          New Order
        </a>
      </Link>

      {getOrdersBySeller.length === 0 ? (
        <p className="mt-5 text-center text-2xl">There's no orders yet</p>
      ) : (
          getOrdersBySeller.map( order => {
            return (
              <Order key={order.id} order={order}/>
            )
          })
      )}
    </Layout>
  );
}

export default Orders;