// pages/contact.tsx

import React from 'react';
import { useFormik, Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import FieldGroup from '../components/reusable/FieldGroup';
import Button, { ButtonVariants } from '../components/reusable/Button';
import Head from 'next/head';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

const Contact: React.FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Contact | Nathaniel J. Clement</title>
      </Head>
      <div><i>Please reach out if you have any questions.</i></div>
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="flex flex-col gap-4">
        <FieldGroup name="name" label="Name" placeholder="Enter your name" />
        <FieldGroup name="email" label="Email" type="email" placeholder="Enter your email address" />
        <FieldGroup name="message" label="Message" as="textarea" placeholder="" />
        <Button variants={[ButtonVariants.PRIMARY]} type="submit">Submit</Button>
      </Form>
    </Formik>
    </div>
  );
}

export default Contact;
