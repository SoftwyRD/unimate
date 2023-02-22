import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { login } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico no válido")
        .required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      dispatch(login(values))
        .then(() => {
          setSubmitting(false);
          history.push("/dashboard");
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
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