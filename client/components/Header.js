import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  {
    getUser {
      id
      name
      lastname
    }
  }
`;

function Header() {
  //Apollo Query
  const { data, loading, error } = useQuery(GET_USER);
  console.info(data);
  console.log(loading);
  console.error(error);

  //Next Routing
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!data.getUser) {
    return router.push('/login');
  }

  const { name } = data.getUser;

  const logOut = () => {
    window.localStorage.removeItem('token');

    router.push('/login');
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2 text-green-700">Hello {name}</p>

      <button
        className="bg-green-800 w-full sm:w-auto py-1 px-2 text-white text-xs font-bold rounded uppercase shadow-md hover:bg-green-900"
        type="button"
        onClick={() => logOut()}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;