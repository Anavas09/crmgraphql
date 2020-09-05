import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';

//Order Context
import OrderContext from '../../context/orders/OrderContext';

//Query
import { GET_PRODUCTS } from '../../graphql/queries';

function SetClient() {
  const [product, setProduct] = useState({});

  //Order Context. Use context and get functions and values
  const orderContext = useContext(OrderContext);
  const { addProduct } = orderContext;

  useEffect(() => {
    addProduct(product);
  }, [product]);

  const setProducts = product => {
    setProduct(product);
  };

  //Apollo Query. Get Clients form DB.
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-green-800 text-green-700 p-2 text-sm font-bold">
        2.- Select Products
      </p>
      <Select
        isMulti={true}
        isLoading={loading}
        className="mt-3"
        options={loading ? null : data.getProducts}
        onChange={product => setProducts(product)}
        getOptionValue={options => options.id}
        getOptionLabel={options => `${options.name} - ${options.stock} Available`}
        placeholder="Search or Choose Products"
        noOptionsMessage={() => 'Product not found'}
      />
    </>
  );
}

export default SetClient;