import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

//Query
import { GET_USER } from '../graphql/queries';

function Header() {
  //Apollo Query
  const { data, loading, error } = useQuery(GET_USER);

  //Next Routing
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!data.getUser) {
    router.push('/login');
    return null;
  }

  const { name } = data.getUser;

  const logOut = () => {
    window.localStorage.removeItem('token');

    router.push('/login');
  };

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 text-green-700 lg:mb-0">Hello {name}</p>

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