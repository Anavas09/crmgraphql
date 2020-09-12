import React from 'react'
import PropTypes from 'prop-types'

function Order({order}) {
  return (
    <h1>{order.total}</h1>
  )
}

Order.propTypes = {
  order: PropTypes.object.isRequired
}

export default Order;