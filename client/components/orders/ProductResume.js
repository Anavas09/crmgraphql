import React from 'react'
import PropTypes from 'prop-types';

function ProductResume({ product }) {
  
  const { name, price } = product;

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>${price}</p>
      </div>

      <input
        type="number"
        placeholder="Quantity"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
      />
    </div>
  )
}

ProductResume.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductResume