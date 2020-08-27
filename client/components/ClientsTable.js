import React from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';

import { DELETE_CLIENT } from '../graphql/mutations';

function ClientsTable({ getClientsSeller }) {

  //Delete client mutation
  const [deleteClient] = useMutation(DELETE_CLIENT);

  //Delete Client
  const confirmDeleteClient = client => {
    Swal.fire({
      title: '¿Are you sure?',
      text: "You wont't be able to reverse this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it'
    }).then( async res => {
      if (res.value) {
        try {

          //Delete by ID
          const { data } = await deleteClient({
            variables: {
              id: client.id
            }
          })

          console.log(data);

          //Show alert
          Swal.fire(
            `Deleted!`,
            data.deleteClient.replace('Client deleted', `Client ${client.name} ${client.lastname} has been remove from list`),
            'success'
          )
          
        } catch (error) {
          
        }
      }
    })
  };

  return getClientsSeller && getClientsSeller.length > 0 ? (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-green-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Name</th>
          <th className="w-1/5 py-2">Company</th>
          <th className="w-1/5 py-2">Email</th>
          <th className="w-1/5 py-2">Delete</th>
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
              <td className="border px-4 py-2">
                <button
                  className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                  type="button"
                  onClick={() => confirmDeleteClient(client)}
                >
                  Delete
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 ml-2"
                  >
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <>
      <h1 className="text-center text-2xl text-green-800 font-bold">
        Nothing to see here!
      </h1>

      <Link href="/newclient">
        <a className="bg-green-800 flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
          Add a new Client
        </a>
      </Link>
    </>
  );
}

export default ClientsTable;