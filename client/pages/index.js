import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';

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

  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-green-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Company</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.getClientsSeller.length > 0 &&
            data.getClientsSeller.map(client => {
              return (
                <tr key={client.id}>
                  <td className="border px-4 py-2">
                    {client.name} {client.lastname}
                  </td>
                  <td className="border px-4 py-2">{client.company}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

export default Index;