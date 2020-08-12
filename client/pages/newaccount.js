import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Layout from '../components/Layout';

function NewAccount() {

  //Form Validations
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log('SUBMITING');
      console.log(values);
    },
  });

  return (
    <>
      <Layout>
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
                />
              </div>
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
                />
              </div>
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
                />
              </div>
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
                />
              </div>
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