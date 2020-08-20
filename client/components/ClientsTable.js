import React from 'react';

function ClientsTable({ getClientsSeller }) {
  return getClientsSeller && getClientsSeller.length > 0 ? (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-green-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Name</th>
          <th className="w-1/5 py-2">Company</th>
          <th className="w-1/5 py-2">Email</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {getClientsSeller.map(client => {
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
  ) : (
    <h1 className="text-center text-2xl text-green-800 font-bold">
      Nothing to see here!
    </h1>
  );
}

export default ClientsTable;