import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Layout from '../../components/Layout';

//Query
import { GET_CLIENT } from '../../graphql/queries';

//Mutation
import { UPDATE_CLIENT } from '../../graphql/mutations';

function EditClient() {
  //Next Routing
  const router = useRouter();

  //Get the ID from router query
  const { query: { id } } = router;

  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-light">
          Loading...
        </h1>
      </Layout>
    );
  };

  const { getClient } = data;

  //Update Client info in the database
  const updateClientInfo = async clientData => {
    const { name, lastname, email, company, phone } = clientData;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastname,
            email,
            company,
            phone,
          },
        },
      });

      //Show alert
      Swal.fire(
        `Updated!`,
        'Client information was succesfully updated',
        'success'
      );

      //Redirect to Clients page (Home page).
      router.push('/');
    } catch (err) {
      //Show alert
      Swal.fire('Error!', err, 'error');
      console.error(err);
    }
  };

  //Validaton Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Add a name'),
    lastname: Yup.string().required('Add a lastname'),
    email: Yup.string().email('Invalid email').required('Add a email'),
    company: Yup.string().required('Add a company name'),
  });

  return (
    <Layout>
      <h1 className="text-2xl text-green-800 font-light">Edit Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            initialValues={getClient}
            enableReinitialize={true}
            onSubmit={values => updateClientInfo(values)}
          >
            {props => {
              const errorName = props.touched.name && props.errors.name && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{props.errors.name}</p>
                </div>
              );

              const errorLastname = props.touched.lastname &&
                props.errors.lastname && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{props.errors.lastname}</p>
                  </div>
                );

              const errorEmail = props.touched.email && props.errors.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{props.errors.email}</p>
                </div>
              );

              const errorCompany = props.touched.company &&
                props.errors.company && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{props.errors.company}</p>
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
                      htmlFor="lastname"
                    >
                      Lastname
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastname"
                      type="text"
                      placeholder="Client Lastname"
                      value={props.values.lastname}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
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
                      value={props.values.company}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
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
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

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

export default EditClient;