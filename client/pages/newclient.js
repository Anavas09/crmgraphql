import React from 'react';
import Layout from '../components/Layout';

function NewClient() {
  return (
    <Layout>
      <h1 className="text-2xl text-green-800 font-light">New Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            //onSubmit={formik.handleSubmit}
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
                //value={formik.values.name}
                //onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
              />
            </div>

            {/*errorName*/}

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
                //value={formik.values.lastname}
                //onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
              />
            </div>

            {/*errorLastname*/}

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
                //value={formik.values.email}
                //onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
              />
            </div>

            {/*errorEmail*/}

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
                //value={formik.values.password}
                //onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
              />
            </div>

            {/*errorPassword*/}

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
                //value={formik.values.password}
                //onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
              />
            </div>

            {/*errorPassword*/}

            <input
              className="bg-green-800 w-full mt-5 p-2 text-white font-bold uppercase hover:bg-green-900"
              type="submit"
              value="Add Client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewClient;