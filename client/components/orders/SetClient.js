import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { id: 1, name: 'Chocolate' },
  { id: 2, name: 'Strawberry' },
  { id: 3, name: 'Vanilla' },
];

function SetClient() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  const setClientsOrders = client => {
    setClients(client);
  };

  return (
    <Select
      isMulti={true}
      options={options}
      onChange={client => setClientsOrders(client)}
      getOptionValue={options => options.id}
      getOptionLabel={options => options.name}
      placeholder="Search or Choose a Client"
      noOptionsMessage={() => 'Client not found'}
    />
  );
}

export default SetClient;