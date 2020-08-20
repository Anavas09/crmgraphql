import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Layout from '../components/Layout';
import ClientsTable from '../components/ClientsTable';

const GET_CLIENTS_SELLER = gql`
  {
    getClientsSeller {
      id
      name
      lastname
      company
      email
    }
  }
`;

function Index() {
  //Apollo Query
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);
  console.log(data);
  console.info(loading);
  console.error(error);

  //Next Routing
  const router = useRouter();

  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Loading...</h1>
      </Layout>
    );
  }

  if (!data.getClientsSeller) {
    router.push('/login');
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

      {data.getClientsSeller && (
        <ClientsTable getClientsSeller={data.getClientsSeller} />
      )}

    </Layout>
  );
}

export default Index;