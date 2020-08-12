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
        <li className={router.pathname === "/" ? "bg-green-900 p-2" : "p-2"}>
          <Link href="/"><a className="text-white block">Clients</a></Link>
        </li>
        <li className={router.pathname === "/products" ? "bg-green-900 p-2" : "p-2"}>
          <Link href="/products"><a className="text-white block">Products</a></Link>
        </li>
        <li className={router.pathname === "/orders" ? "bg-green-900 p-2" : "p-2"}>
          <Link href="/orders"><a className="text-white block">Orders</a></Link>
        </li>
      </nav>
    </aside>
  );
}

export default Sidebar;