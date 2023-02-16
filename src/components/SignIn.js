import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const SignIn = () => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string("Invalid Email").required("The email is required"),
    password: Yup.string()
      .required("The password is required"),
  });
  return (
    <div>
      <h1>Inicia Sesion</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmit }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmit(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
