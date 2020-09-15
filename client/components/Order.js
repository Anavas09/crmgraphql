import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Order({ order }) {
  const { id, client, total, state } = order;
  const [orderStatus, setOrderStatus] = useState(state);

  useEffect(() => {
    if (orderStatus) {
      setOrderStatus(orderStatus);
    }
  }, [orderStatus]);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">Client: {client}</p>

        <h2 className="font-bold text-gray-800 mt-10">Status:</h2>

        <select
          className="mt-2 appearance-none bg-green-600 border border-green-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-green-600 focus:border-green-500 uppercase text-xs font-bold"
          value={orderStatus}
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

        <button className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold">
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
    client: PropTypes.string,
    total: PropTypes.number,
    state: PropTypes.string,
    order: PropTypes.array,
  }).isRequired,
};

export default Order;