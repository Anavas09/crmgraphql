import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';

//Mutation
import { DELETE_ORDER, UPDATE_ORDER } from '../graphql/mutations';
import { GET_ORDERS_BY_SELLER } from '../graphql/queries';

function Order({ order }) {
  const { id, client: {name, lastname, email, phone}, total, status, client } = order;

  //Update order status
  const [updateOrder] = useMutation(UPDATE_ORDER);

  const [orderStatus, setOrderStatus] = useState(status);
  const [statusColor, setStatusColor] = useState('')

  useEffect(() => {
    if (orderStatus) {
      setOrderStatus(orderStatus);
    }
    orderStatusColor();
  }, [orderStatus]);

  //Modify the order color by status
  const orderStatusColor = () => {
    if (orderStatus === 'PENDING') {
      setStatusColor('border-yellow-500');
    } else if (orderStatus === 'COMPLETE') {
      setStatusColor('border-green-500');
    } else {
      setStatusColor('border-red-800')
    }
  }

  const changeOrderStatus = async newStatus => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            client: client.id,
            status: newStatus,
            total
          }
        }
      });
      setOrderStatus(data.updateOrder.status);
    } catch (err) {
      console.log(err);
    }
  };

  //Delete order mutation
  const [deleteOrder] = useMutation(DELETE_ORDER);

  //Delete Order
  const confirmDeleteOrder = order => {
    Swal.fire({
      title: '¿Are you sure?',
      text: "You wont't be able to reverse this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it'
    }).then(async res => {
      if (res.value) {
        try {
          //Delete by ID
          const { data } = await deleteOrder({
            variables: {
              id: order.id,
            },
            update(cache) {
              //Get the object from cache that you want to update
              const { getOrdersBySeller } = cache.readQuery({
                query: GET_ORDERS_BY_SELLER,
              });

              //Rewrite the cache (The cache is inmutable. Should never be modified)
              cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                  getOrdersBySeller: getOrdersBySeller.filter(
                    actualOrder => actualOrder.id !== id
                  ),
                },
              });
            },
          });

          //Show alert
          Swal.fire(
            `Deleted!`,
            data.deleteOrder,
            'success'
          )
          
        } catch (err) {

          //Show alert
          Swal.fire('Error', err.message, 'error');
          
        };
      };
    });
  };

  return (
    <div className={`${statusColor} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
      <div>
        <p className="font-bold text-gray-800">
          Client: {name} {lastname}
        </p>

        <p className="flex items-center my-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-2"
          >
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          {email}
        </p>

        {phone && (
          <p className="flex items-center my-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            {phone}
          </p>
        )}

        <h2 className="font-bold text-gray-800 mt-10">Status:</h2>

        <select
          className="mt-2 appearance-none bg-green-600 border border-green-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-green-600 focus:border-green-500 uppercase text-xs font-bold"
          value={orderStatus}
          onChange={e => changeOrderStatus(e.target.value)}
        >
          <option value="COMPLETE">COMPLETE</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>

      <div>
        <h2 className="mt-2 text-gray-800 font-bold">Order Resume</h2>

        {order.order.map(product => {
          const { name, quantity } = product;
          return (
            <div key={product.id} className="mt-4">
              <p className="text-sm text-gray-600">Product: {name}</p>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            </div>
          );
        })}

        <p className="mt-3 text-gray-800 font-bold">
          Total to pay: <span className="font-light">${total}</span>
        </p>

        <button
          className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
          onClick={() => confirmDeleteOrder(order)}
        >
          Delete Order
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
      </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    client: PropTypes.shape({
      name: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    }),
    total: PropTypes.number,
    state: PropTypes.string,
    order: PropTypes.array,
  }).isRequired,
};

export default Order;