import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../store/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0px",
  },
  form: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "8px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    fontSize: "20px",

    color: "#333",
    "&:focus": {
      outline: "none",
    },
  },
  error: {
    color: "red",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: "16px",
  },
  submitButton: {
    width: "50%",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
    "&:disabled": {
      backgroundColor: "#9e9e9e",
      cursor: "not-allowed",
    },
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Field required"),
      password: Yup.string().required("Field required"),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      dispatch(login(values))
        .then(() => {
          setSubmitting(false);
          navigate("/main");
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.response.status === 401) {
            setFieldError("password", "Invalid credentials");
          } else {
            console.error(error);
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <TextField
        id="username"
        name="username"
        placeholder="Username"
        variant="outlined"
        autoFocus
        size="small"
        className={classes.input}
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
      />

      <TextField
        id="password"
        name="password"
        placeholder="Password"
        variant="outlined"
        size="small"
        className={classes.input}
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
      />
      {formik.errors.general && (
        <Box className={classes.error}>{formik.errors.general}</Box>
      )}
      
      <Button
        type="submit"
        className={classes.submitButton}
        disabled={formik.isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
};

export default Login;
