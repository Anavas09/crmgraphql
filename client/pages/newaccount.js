import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

import Layout from '../components/Layout';

const NEW_ACCOUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastname
      age
      email
    }
  }
`;

function NewAccount() {
  const [message, setMessage] = useState(null);
  const [good, setGood] = useState(false);
  
  //Next.js routing
  const router = useRouter();

  //New Account Mutation
  const [newUser] = useMutation(NEW_ACCOUNT);

  //Form Validations
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      age: 18,
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Add a name'),
      lastname: Yup.string().required('Add a lastname'),
      age: Yup.number().required('Add a age'),
      email: Yup.string().email('Invalid email').required('Add a email'),
      password: Yup.string().required('Add a password').min(6, 'The password must be at least of 6 characters'),
    }),
    onSubmit: async values => {
      console.log('SUBMITING');
      console.log(values);

      const { name, lastname, age, email, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastname,
              email,
              password,
              age,
            },
          },
        });

        //User created succesfully
        setGood(true);
        setMessage(`User ${data.newUser.name} was created!`);

        setTimeout(() => {
          setMessage(null);
          setGood(false);
          
          //Redirect to login page
          router.push('/login');
        }, 3000);

      } catch (err) {
        setMessage(err.message);
        console.error(err.message);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

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

  const errorAge = formik.touched.age && formik.errors.age && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.age}</p>
    </div>
  );

  const errorEmail = formik.touched.email && formik.errors.email && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.email}</p>
    </div>
  );

  const errorPassword = formik.touched.password && formik.errors.password && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.password}</p>
    </div>
  );

  const showMessage = () => {
    return (
      good ? (
        <div className="bg-green-200 text-green-700 font-bold py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
          <p>{message.toUpperCase()}</p>
        </div>
      ) : (
          <div className="bg-red-200 text-red-700 font-bold py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            <p>{message.toUpperCase()}</p>
          </div>
        )
    );
  };

  return (
    <>
      <Layout>

        {message && showMessage()}

        <h1 className="text-center text-2xl text-white font-light">
          New Account
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
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
                  placeholder="Name"
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
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorLastname}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorAge}

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
                  placeholder="User Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorEmail}

              <div className="mb-4">
                <label
                  className="block text-green-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {errorPassword}

              <input
                className="bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-900"
                type="submit"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default NewAccount;