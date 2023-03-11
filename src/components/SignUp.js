import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  signUpContainer: {
    marginTop: "30px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

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
      await axios.post("https://calendar.softwy.com/api/users/", values);
      alert("Sign up successful!");
      navigate('/Login')
    } catch (error) {
      alert("Error signing up!");
      setErrors({ submit: "Error submitting form." });
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    type="text"
                    placeholder="First Name"
                    autoFocus
                    name="first_name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="first_name" component="div" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    type="text"
                    name="middle_name"
                    placeholder="Middle Name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="last_name" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="username" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="email" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="confirm_password" component="div" />
                </Grid>
                <Grid item xs={12} className={classes.buttonContainer}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
export default SignUp;
