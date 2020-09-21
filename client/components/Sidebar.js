import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Sidebar() {
  //Next routing
  const router = useRouter();

  return (
    <aside className="bg-green-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clients</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === '/' ? 'bg-green-900 p-2' : 'p-2'}>
          <Link href="/">
            <a className="text-white block">Clients</a>
          </Link>
        </li>
        <li className={router.pathname === '/products' ? 'bg-green-900 p-2' : 'p-2'}>
          <Link href="/products">
            <a className="text-white block">Products</a>
          </Link>
        </li>
        <li
          className={router.pathname === '/orders' ? 'bg-green-900 p-2' : 'p-2'}
        >
          <Link href="/orders">
            <a className="text-white block">Orders</a>
          </Link>
        </li>
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">More Options</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === '/bestsellers' ? 'bg-green-900 p-2' : 'p-2'}>
          <Link href="/bestsellers">
            <a className="text-white block">Best Sellers</a>
          </Link>
        </li>
        <li className={router.pathname === '/bestclients' ? 'bg-green-900 p-2' : 'p-2'}>
          <Link href="/bestclients">
            <a className="text-white block">Best Clients</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
}

export default Sidebar;