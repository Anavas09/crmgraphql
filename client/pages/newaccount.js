import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import Layout from '../components/Layout';
import NewAccountForm from '../components/NewAccountForm';

//Mutation
import { NEW_ACCOUNT } from '../graphql/mutations';

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
            <NewAccountForm formik={formik}/>
          </div>
        </div>
        
      </Layout>
    </>
  );
}

export default NewAccount;