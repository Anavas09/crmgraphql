import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import Layout from '../components/Layout';
import NewProductForm from '../components/forms/NewProductForm';

//Mutation
import { NEW_PRODUCT } from '../graphql/mutations';
import { GET_PRODUCTS } from '../graphql/queries';

function NewProduct() {

  //Next.js routing
  const router = useRouter();

  //New Product Mutation
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      //Get the object from cache that you want to update
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      //Rewrite the cache (The cache is inmutable. Should never be modified)
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  //Form Validations
  const formik = useFormik({
    initialValues: {
      name: '',
      stock: 1,
      price: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Add a name'),
      stock: Yup.number().required('Add number of stock'),
      price: Yup.number().required('Add a price greater than 0'),
    }),
    onSubmit: async values => {

      const { name, stock, price } = values;

      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              stock,
              price,
            },
          },
        });

        //Product added. Show alert
        Swal.fire(
          `Added!`,
          `Product ${data.newProduct.name} was added to the list`,
          'success'
        );

        //Redirect to Products page (products).
        router.push('/products');
      } catch (err) {
        //Show alert
        Swal.fire('Error!', err, 'error');
        console.error(err);
      }
    },
  });

  return (
    <Layout title="New Product">
      <h1 className="text-2xl bg-green-800 text-center text-white font-bold">
        New Product
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <NewProductForm formik={formik} />
        </div>
      </div>
    </Layout>
  );
}

export default NewProduct;