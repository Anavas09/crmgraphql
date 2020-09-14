import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Order({ order }) {
  const { id, client, total, state } = order;
  const [orderStatus, setOrderStatus] = useState(state);

  useEffect(() => {
    setOrderStatus(orderStatus);
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
          )
        })}
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