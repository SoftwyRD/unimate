import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const SignUp = () => {
  const SignUpSchema = Yup.object().shape({
    first_name: Yup.string().required("The name is required!"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string().required("The username is required"),
    email: Yup.string("Invalid Email").required("The email is required"),
    password: Yup.string()
      .min(8, "The password is too short!")
      .required("The password is required"),

    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post("https://calendar.softwy.com/api/users/", values);
      alert("Sign up successful!");
    } catch (error) {
      alert("Error signing up !");
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          first_name: "",
          middle_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="first_name" placeholder="Name" />
              <ErrorMessage name="first_name" component="div" />
            </div>

            <div>
              <Field type="text" name="middle_name" placeholder="Middle Name" />
              <ErrorMessage name="middle_name" component="div" />
            </div>
            <div>
              <Field type="text" name="last_name" placeholder="Last Name" />
              <ErrorMessage name="last_name" component="div" />
            </div>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field
                type="password"
                name="confirm_password"
                placeholder="Confirm the password"
              />
              <ErrorMessage name="confirm_password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
