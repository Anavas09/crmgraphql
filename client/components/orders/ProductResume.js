import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//Order Context
import OrderContext from '../../context/orders/OrderContext';

function ProductResume({ product }) {
  const [quantity, setQuantity] = useState(0);

  //Order Context. Use context and get functions and values
  const orderContext = useContext(OrderContext);
  const { productQuantity } = orderContext;

  useEffect(() => {
    addQuantityToProduct();
  }, [quantity]);

  const addQuantityToProduct = () => {
    const newProduct = { ...product, quantity: Number(quantity) };
    productQuantity(newProduct);
  };
  
  const { name, price } = product;

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>${price}</p>
      </div>

      <input
        type="number"
        value={quantity}
        placeholder="Quantity"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={e => setQuantity(e.target.value)}
      />
    </div>
  )
}

ProductResume.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductResume