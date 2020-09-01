import React from 'react';

function NewProductForm({ formik }) {
  const errorName = formik.touched.name && formik.errors.name && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.name}</p>
    </div>
  );

  const errorStock = formik.touched.stock && formik.errors.stock && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.stock}</p>
    </div>
  );

  const errorPrice = formik.touched.price && formik.errors.price && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.price}</p>
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
          htmlFor="stock"
        >
          Stock
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="stock"
          type="number"
          placeholder="Stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {errorStock}

      <div className="mb-4">
        <label
          className="block text-green-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {errorPrice}

      <input
        className="bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-900"
        type="submit"
        value="Add Product"
      />
    </form>
  );
}

export default NewProductForm;