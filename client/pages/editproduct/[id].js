import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Layout from '../../components/Layout';

//Query
import { GET_PRODUCT } from '../../graphql/queries';

//Mutation
import { UPDATE_PRODUCT } from '../../graphql/mutations';

function EditProduct() {
  //Next Routing
  const router = useRouter();

  //Get the ID from router query
  const { query: { id } } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  }

  const { getProduct } = data;

  //Update Product info in the database
  const updateProductInfo = async productInfo => {
    const { name, stock, price } = productInfo;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            stock,
            price
          },
        },
      });

      //Show alert
      Swal.fire(
        `Updated!`,
        'Product information was succesfully updated',
        'success'
      );

      //Redirect to Products page (products).
      router.push('/products');
    } catch (err) {
      //Show alert
      Swal.fire('Error!', err.message, 'error');
      console.error(err);
    }
  };

  //Validaton Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Add a name'),
    stock: Yup.number().required('Add number of stock'),
    price: Yup.number().required('Add a price greater than 0'),
  });

  return (
    <Layout title="Edit Product">
      <h1 className="text-2xl text-center text-green-800 font-bold">
        Edit Product
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            initialValues={getProduct}
            enableReinitialize={true}
            onSubmit={values => updateProductInfo(values)}
          >
            {props => {
              const errorName = props.touched.name && props.errors.name && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{props.errors.name}</p>
                </div>
              );

              const errorStock = props.touched.stock && props.errors.stock && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{props.errors.stock}</p>
                </div>
              );

              const errorPrice = props.touched.price && props.errors.price && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{props.errors.price}</p>
                </div>
              );

              return (
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-green-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Client Name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {errorName}

                  <div className="mb-4">
                    <label
                      className="block text-green-700 text-sm font-bold mb-2"
                      htmlFor="stock"
                    >
                      Stock
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="stock"
                      type="number"
                      placeholder="Stock"
                      value={props.values.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {errorStock}

                  <div className="mb-4">
                    <label
                      className="block text-green-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="number"
                      placeholder="Price"
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {errorPrice}

                  <input
                    className="bg-green-800 w-full mt-5 p-2 text-white font-bold uppercase hover:bg-green-900"
                    type="submit"
                    value="Edit"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default EditProduct;