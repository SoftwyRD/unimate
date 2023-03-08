import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../store/authSlice";
import "../../src/styles/SignIn.css";

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      dispatch(login(values))
        .then(() => {
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.response.status === 401) {
            setFieldError("password", "Credenciales inválidas");
          } else {
            console.error(error);
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Ingrese su usuario"
        />
        {formik.touched.username && formik.errors.username && (
          <div>{formik.errors.username}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Ingrese su contraseña"
        />
        {formik.touched.password && formik.errors.password && (
          <div>{formik.errors.password}</div>
        )}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
