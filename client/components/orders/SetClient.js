import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

//Order Context
import OrderContext from '../../context/orders/OrderContext';

//Query
import { GET_CLIENTS_SELLER } from '../../graphql/queries';

function SetClient() {
  const [client, setClient] = useState({});

  //Order Context. Use context and get functions and values
  const orderContext = useContext(OrderContext);
  const { addClient } = orderContext;

  useEffect(() => {
    addClient(client);
  }, [client]);

  const setClientOrders = client => {
    setClient(client);
  };

  //Apollo Query. Get Clients form DB.
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  //Next Routing
  const router = useRouter();

  if (loading) return null;

  const { getClientsSeller } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-green-800 text-green-700 p-2 text-sm font-bold">
        1.- Choose a Client
      </p>
      <Select
        className="mt-3"
        options={getClientsSeller}
        onChange={client => setClientOrders(client)}
        getOptionValue={options => options.id}
        getOptionLabel={options => options.name}
        placeholder="Search or Choose a Client"
        noOptionsMessage={() => 'Client not found'}
      />
    </>
  );
}

export default SetClient;