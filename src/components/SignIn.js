import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../store/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import store from "../store/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0px",
  },
  form: {
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
    margin: "20px",
  },
  submitButton: {
    width: "50%",
    backgroundColor: "#535AE5",
    boxShadow: "0px 3px 6px #00000059",
    background: "#535AE5 0% 0% no-repeat padding-box",
    marginTop: "20px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: "20px",
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
  forgotPassword: {
    fontSize: "16px",
    textAlign: "center",
    textDecoration: "underline",
    color: "#C4C4C4",
    cursor: "pointer",
    marginTop: "16px",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsLoading(true);
      try {
        await dispatch(login(values));
        setSubmitting(false);
        const authState = store.getState().auth;
        if (authState.isLoggedIn) {
          navigate("/main");
        } else
          setShowError(() => {
            return true;
          });
      } catch (error) {
        setSubmitting(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
            borderRadius: "20px",
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
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          style: {
            borderRadius: "20px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>

      {showError && (
        <Typography
          fontFamily="MADE Tommy Soft"
          fontWeight={500}
          variant="subtitle2"
          className={classes.error}
          style={{ marginTop: "20px" }}
        >
          Incorrect username or password
        </Typography>
      )}

      <Box mt={2} style={{ marginTop: "20px" }}>
        <Link to="/forgot-password" className={classes.forgotPassword}>
          Forgot password?
        </Link>
      </Box>
    </form>
  );
};

export default Login;