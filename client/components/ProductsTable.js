import React from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

//Query
import { GET_PRODUCTS } from '../graphql/queries';

//Mutation
import { DELETE_PRODUCT } from '../graphql/mutations';

function ProductsTable({ product }) {
  //Delete product mutation
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  //Delete product
  const confirmDeleteProduct = product => {
    Swal.fire({
      title: '¿Are you sure?',
      text: "You wont't be able to reverse this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it',
    }).then(async res => {
      if (res.value) {
        try {
          const { id, name } = product;
          //Delete by ID
          const { data } = await deleteProduct({
            variables: {
              id,
            },
            update(cache) {
              //Get the object from cache that you want to update
              const { getProducts } = cache.readQuery({
                query: GET_PRODUCTS,
              });

              //Rewrite the cache (The cache is inmutable. Should never be modified)
              cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                  getProducts: getProducts.filter(
                    actualProduct => actualProduct.id !== id
                  ),
                },
              });
            },
          });

          //Show alert
          Swal.fire(
            `Deleted!`,
            data.deleteProduct.replace(
              'Product deleted',
              `Product ${name.uppercase()}, has been remove from list`
            ),
            'success'
          );
        } catch (err) {
          //Show alert
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            timer: 2000,
          });
        }
      }
    });
  };

  const router = useRouter();

  const editProduct = id => {
    router.push(`/editproduct/${id}`);
  };
  return (
    <tr>
      <td className="border px-4 py-2">
        {product.name}
      </td>
      <td className="border px-4 py-2">{product.stock}</td>
      <td className="border px-4 py-2">{product.price}</td>
      <td className="border px-4 py-2">
        <button
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-900"
          type="button"
          onClick={() => confirmDeleteProduct(product)}
        >
          Delete
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
      </td>
      <td className="border px-4 py-2">
        <button
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-green-700"
          type="button"
          onClick={() => editProduct(product.id)}
        >
          Edit
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-8 h-8 ml-2"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8j586z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default ProductsTable;