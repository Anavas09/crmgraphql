import React from 'react'

function NewClientForm({formik}) {

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
  );
}

export default NewClientForm;