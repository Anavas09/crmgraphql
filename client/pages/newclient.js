import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';

import Layout from '../components/Layout';

//Mutation
const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      email
      company
      phone
    }
  }
`;

//Query
const GET_CLIENTS_SELLER = gql`
  {
    getClientsSeller {
      id
      name
      lastname
      company
      email
    }
  }
`;

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

      //Rewrite the cache (The cache is inmutable. Never must be modified)
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

  const errorName = formik.touched.name && formik.errors.name && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.name}</p>
    </div>
  );

  const errorLastname = formik.touched.lastname && formik.errors.lastname && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.lastname}</p>
    </div>
  );

  const errorEmail = formik.touched.email && formik.errors.email && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.email}</p>
    </div>
  );

  const errorCompany = formik.touched.company && formik.errors.company && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.company}</p>
    </div>
  );

  return (
    <>
      <Layout>
        {message && showMessage()}
        <h1 className="text-2xl text-green-800 font-light">New Client</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorName}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Lastname
              </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Client Lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorLastname}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
              </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Client Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorEmail}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="company"
                >
                  Company
              </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company"
                  type="text"
                  placeholder="Company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorCompany}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
              </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <input
                className="bg-green-800 w-full mt-5 p-2 text-white font-bold uppercase hover:bg-green-900"
                type="submit"
                value="Add Client"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default NewClient;