import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../src/styles/SignUp.css"
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
    <div className="form-container">
      <h1 className="center-text">Sign Up</h1>
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
          <Form className="form">
            <div className="form-group">
              <Field
                type="text"
                name="first_name"
                placeholder="Name"
                className="form-control"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                className="form-control"
              />
              <ErrorMessage
                name="middle_name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="form-control"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="confirm_password"
                placeholder="Confirm the password"
                className="form-control"
              />
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
