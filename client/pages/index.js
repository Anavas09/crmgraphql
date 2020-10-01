import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import Layout from '../components/Layout';
import ClientsTable from '../components/ClientsTable';
import Link from 'next/link';

//Query
import { GET_CLIENTS_SELLER } from '../graphql/queries';

function Index() {
  //Apollo Query
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  //Next Routing
  const router = useRouter();

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  if (!data.getClientsSeller) {
    router.push('/login');
    return null;
  }

  return (
    <Layout title="Clients">
      <h1 className="text-2xl text-green-800 font-light">Clients</h1>

      {data && data.getClientsSeller && data.getClientsSeller.length > 0 && (
        <Link href="/newclient">
          <a className="bg-green-800 py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900 w-full lg:w-auto text-center">
            New Client
          </a>
        </Link>
      )}

      {data && data.getClientsSeller && data.getClientsSeller.length === 0 ? (
        <>
          <p className="mt-5 text-center text-2xl">There's no clients yet</p>

          <Link href="/newclient">
            <a className="bg-green-800 flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
              New Client
            </a>
          </Link>
        </>
      ) : (
        data.getClientsSeller && (
          <ClientsTable getClientsSeller={data.getClientsSeller} />
        )
      )}
    </Layout>
  );
}

export default Index;