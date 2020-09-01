import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import Layout from '../components/Layout';
import NewClientForm from '../components/forms/NewClientForm';

//Query
import { GET_CLIENTS_SELLER } from '../graphql/queries';

//Mutation
import { NEW_CLIENT } from '../graphql/mutations';

function NewClient() {
  const [message, setMessage] = useState(null);
  const [good, setGood] = useState(false);

  //Next.js routing
  const router = useRouter();

  //New Client Mutation
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      //Get the object from cache that you want to update
      const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_SELLER });

      //Rewrite the cache (The cache is inmutable. Should never be modified)
      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: {
          getClientsSeller: [...getClientsSeller, newClient]
        }
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      company: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Add a name'),
      lastname: Yup.string().required('Add a lastname'),
      email: Yup.string().email('Invalid email').required('Add a email'),
      company: Yup.string().required('Add a company name'),
    }),
    onSubmit: async values => {
      const { name, lastname, phone, email, company } = values;
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastname,
              email,
              company,
              phone,
            },
          },
        });

        //Client created succesfully
        setGood(true);
        setMessage(`Client ${data.newClient.name} added!`);

        setTimeout(() => {
          setMessage(null);
          setGood(false);

          //Redirect to clients (index) page
          router.push('/');
        }, 2000);
      } catch (err) {
        setMessage(err.message);
        console.error(err.message);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return good ? (
      <div className="bg-green-200 text-green-700 font-bold py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message.toUpperCase()}</p>
      </div>
    ) : (
      <div className="bg-red-200 text-red-700 font-bold py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message.toUpperCase()}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {message && showMessage()}
        <h1 className="text-2xl text-green-800 font-light">New Client</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <NewClientForm formik={formik}/>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default NewClient;