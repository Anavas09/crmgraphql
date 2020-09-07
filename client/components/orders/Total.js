import React from 'react'
import PropTypes from 'prop-types'

function Total(props) {

  const total = 200;

  return (
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-400">
      <h2 className="text-gray-800 text-lg">Total: </h2>
      <p className="text-gray-800 mt-0">{total}</p>
    </div>
  );
}

Total.propTypes = {

}

export default Total