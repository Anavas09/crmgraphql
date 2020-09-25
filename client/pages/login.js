import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

//Mutation
import { AUTH_USER } from '../graphql/mutations';

function Login() {
  const [message, setMessage] = useState(null);
  const [good, setGood] = useState(false);
  
  //Next.js routing
  const router = useRouter();

  //Login user Mutation
  const [authUser] = useMutation(AUTH_USER);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email')
        .required("Email can't be empty"),
      password: Yup.string().required('Password required'),
    }),
    onSubmit: async values => {
      const { email, password } = values;

      try {

        const { data } = await authUser({
          variables: {
            input: {
              email,
              password
            }
          }
        });
        
        setGood(true);
        setMessage('Login...');
        
        //Set token to localStorage
        setTimeout(() => {
          const { token } = data.authUser;
          window.localStorage.setItem('token', token);
        }, 1000);

        setTimeout(() => {
          setMessage(null);
          setGood(false);

          //Redirect to client page
          router.push('/');
        }, 2000);


      } catch (err) {
        setMessage(err.message);
        console.error(err.message);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      };
    },
  });

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
      <Layout title="Login">
        {message && showMessage()}

        <h1 className="text-center text-2xl text-white font-light">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>

              {errorPassword}

              <input
                className="bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-900"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;