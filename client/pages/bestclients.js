import React, { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { GET_BEST_CLIENTS } from '../graphql/queries';

function BestClients() {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_BEST_CLIENTS
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
      <Layout title="Best Clients">
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  if (!data.getBestClients) {
    router.push('/login');
    return null;
  }

  const { getBestClients } = data;

  const graphClient = [];

  //Recharts need a flat array so we do that here
  getBestClients.map((client, index) => {
    graphClient[index] = {
      ...client.client[0],
      total: client.total,
    };
  });

  if (graphClient.length === 0) {
    return (
      <Layout title="Best Clients">
        <p className="mt-5 text-center text-2xl">No one has buy something</p>
      </Layout>
    );
  }

  return (
    <Layout title="Best Clients">
      <h1 className="text-2xl text-gray-800 font-light">Best Clients</h1>

      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={graphClient}
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

export default BestClients;