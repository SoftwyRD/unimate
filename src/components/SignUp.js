import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpContainer = styled(Grid)`
  padding: 50px;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const SignUp = ({changePage}) => {
  // Definir los valores iniciales como objeto y utilizar destructuración
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
      // Mostrar mensaje de éxito al usuario en la interfaz
      alert("Sign up successful!");
      changePage(() => { 
        return "SignIn"
      })
    } catch (error) {
      // Mostrar mensaje de error al usuario en la interfaz
      alert("Error signing up !");
      setErrors({ submit: "Error submitting form." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SignUpContainer container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormContainer>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Label htmlFor="first_name">First Name *</Label>
                  <Field
                    type="text"
                    name="first_name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="first_name" component="div" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Label htmlFor="middle_name">Middle Name</Label>
                  <Field
                    type="text"
                    name="middle_name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Field
                    type="text"
                    name="last_name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="last_name" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="username">Username *</Label>
                  <Field
                    type="text"
                    name="username"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="username" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="email">Email *</Label>
                  <Field
                    type="email"
                    name="email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="email" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="password">Password *</Label>
                  <Field
                    type="password"
                    name="password"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="confirm_password">Confirm Password </Label>
                  <Field
                    type="password"
                    name="confirm_password"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="confirm_password" component="div" />
                </Grid>
                <ButtonContainer item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </ButtonContainer>
              </Grid>
            </FormContainer>
          )}
        </Formik>
      </Grid>
    </SignUpContainer>
  );
};

export default SignUp;