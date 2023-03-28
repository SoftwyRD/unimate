import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/config";
import toast, { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  signUpContainer: {
    marginTop: theme.spacing(4),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      values.middle_name =
        values.middle_name === "" ? null : values.middle_name;
      await axios.post(`${API_BASE_URL}/users/`, values);
      toast.success("Sign up successful!", {
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting form.", {
        duration: 2000,
      });
      setErrors((errors) => {
        return { ...errors, ...error.response.data };
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center" className={classes.signUpContainer}>
      <Grid item xs={12} md={8} lg={7}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={classes.formContainer}>
              <Toaster />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="first_name" component="div" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    type="text"
                    name="middle_name"
                    placeholder="Middle Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="last_name" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="text"
                    name="username"
                    placeholder="Username"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="username" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="email"
                    name="email"
                    placeholder="Email"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="email" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    placeholder="Password"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="confirm_password" component="div" />
                </Grid>
              </Grid>
              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;
