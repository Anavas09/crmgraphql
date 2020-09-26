import React from 'react';

function NewAccountForm({formik}) {
//BELLO
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
  
  return (
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
          Lastname
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastname"
          type="text"
          placeholder="Lastname"
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
  );
}

export default NewAccountForm;