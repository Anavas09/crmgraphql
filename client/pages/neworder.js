import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';
import SetClient from '../components/orders/SetClient';
import SetProducts from '../components/orders/SetProducts';
import OrderResume from '../components/orders/OrderResume';
import Total from '../components/orders/Total';

import OrderContext from '../context/orders/OrderContext';

//Mutation
import { NEW_ORDER } from '../graphql/mutations';

//Query
import { GET_ORDERS_BY_SELLER } from '../graphql/queries';

function NewOrder() {
  const orderContext = useContext(OrderContext);
  const { client, products, totalPrice } = orderContext;

  const validateOrder = () => {
    return !products.every(product => product.quantity > 0) ||
      products.length === 0 ||
      totalPrice === 0 ||
      !client.name
      ? ' opacity-50 cursor-not-allowed '
      : '';
  };

  //Next routing
  const router = useRouter();

  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      //Get the object from cache that you want to update
      const { getOrdersBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER,
      });

      //Rewrite the cache (The cache is inmutable. Should never be modified)
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: [...getOrdersBySeller, newOrder],
        },
      });
    },
  });

  const createNewOrder = async () => {
    //Take only the necesary from products to send the mutation
    const order = products.map(({ __typename, stock, ...product }) => product);

    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: client.id,
            total: totalPrice,
            order,
          },
        },
      });

      //Product added. Show alert
      Swal.fire(`Added!`, `A new order was added to the list`, 'success');

      //Redirect to orders page (/orders)
      router.push('/orders');
    } catch (err) {
      console.log(err);
      Swal.fire('An error has ocurred', err.message, 'error');
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <SetClient />
          <SetProducts />
          <OrderResume />
          <Total />

          <button
            type="button"
            className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900 ${
              products && products.length > 0 && validateOrder()
            }`}
            onClick={createNewOrder}
          >
            Add Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default NewOrder;