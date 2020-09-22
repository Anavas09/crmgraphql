import React, { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { GET_BEST_SELLERS } from '../graphql/queries';

function BestSellers() {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_BEST_SELLERS
  );

  //Next Routing
  const router = useRouter();

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) {
    return (
      <Layout title="Best Sellers">
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  if (!data.getBestSellers) {
    router.push('/login');
    return null;
  }

  const { getBestSellers } = data;

  const graphSeller = [];

  //Recharts need a flat array so we do that here
  getBestSellers.map((seller, index) => {
    graphSeller[index] = {
      ...seller.seller[0],
      total: seller.total,
    };
  });

  return (
    <Layout title="Best Sellers">
      <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>

      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={graphSeller}
          margin={{ top: 5, rigth: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#22543d" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
}

export default BestSellers;