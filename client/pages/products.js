import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import Layout from '../components/Layout';

//Query
import { GET_PRODUCTS } from '../graphql/queries';

import ProductsTable from '../components/ProductsTable';

function Products() {

  //Apollo Query
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  console.log(data);

  const { getProducts } = data;

  return getProducts && getProducts.length > 0 ? (
    <Layout>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-green-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Stock</th>
            <th className="w-1/5 py-2">Price</th>
            <th className="w-1/5 py-2">Delete</th>
            <th className="w-1/5 py-2">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {getProducts.map(product => {
            return <ProductsTable key={product.id} product={product} />;
          })}
        </tbody>
      </table>
    </Layout>
  ) : (
    <Layout>
      <h1 className="text-center text-2xl text-green-800 font-bold">
        Nothing to see here! Add new products
      </h1>

      <Link href="/newproduct">
        <a className="bg-green-800 flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
          Add a new product
        </a>
      </Link>
    </Layout>
  );
}

export default Products;