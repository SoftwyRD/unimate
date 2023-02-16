import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const SignUp = () => {
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("The name is required!"),
    email: Yup.string("Invalid Email").required("The email is required"),
    password: Yup
      .string()
      .min(8, "The password is too short!")
      .max(15, "The password is too long")
      .required("The password is required"),
  });
  return (
    <div>
      <h1>Registrarse</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmit }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmit(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
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

export default SignUp;
