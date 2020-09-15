import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';

//Order Context
import OrderContext from '../../context/orders/OrderContext';

//Query
import { GET_CLIENTS_SELLER } from '../../graphql/queries';

function SetClient() {
  const [client, setClient] = useState({});

  //Order Context. Use context and get functions and values
  const orderContext = useContext(OrderContext);
  const { addClient } = orderContext;

  //Apollo Query. Get Clients form DB.
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  useEffect(() => {
    addClient(client);
  }, [client]);

  const setClientToOrder = client => {
    setClient(client);
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-green-800 text-green-700 p-2 text-sm font-bold">
        1.- Choose a Client
      </p>
      <Select
        isLoading={loading}
        className="mt-3"
        options={loading ? null : data.getClientsSeller}
        onChange={client => setClientToOrder(client)}
        getOptionValue={options => options.id}
        getOptionLabel={options => options.name}
        placeholder="Search or Choose a Client"
        noOptionsMessage={() => 'Client not found'}
      />
    </>
  );
}

export default SetClient;